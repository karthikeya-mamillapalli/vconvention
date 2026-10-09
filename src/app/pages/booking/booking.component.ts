import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Hall, VenueService } from '../../services/venue.service';
import { BookingRequest, BookingService } from '../../services/booking.service';

interface EstimateLine {
  label: string;
  amount: number;
}

interface Estimate {
  lines: EstimateLine[];
  subtotal: number;
  gst: number;
  total: number;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
})
export class BookingComponent implements OnInit, OnDestroy {
  readonly today = new Date().toISOString().slice(0, 10);

  form!: FormGroup;
  submitted: BookingRequest | null = null;
  triedSubmit = false;

  // Derived state, recalculated whenever the form changes
  selectedHall?: Hall;
  availability: 'unknown' | 'available' | 'booked' = 'unknown';
  overCapacity = false;
  estimate: Estimate = { lines: [], subtotal: 0, gst: 0, total: 0 };

  private sub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public venue: VenueService,
    public bookingService: BookingService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      hallId: [this.route.snapshot.queryParamMap.get('hall') || 'grand', Validators.required],
      date: ['', Validators.required],
      eventType: ['wedding', Validators.required],
      guests: [300, [Validators.required, Validators.min(20)]],
      addOns: [[] as string[]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^[+\d][\d\s-]{9,14}$/)]],
      email: ['', [Validators.email]],
      notes: [''],
    });

    this.recalculate();
    this.sub = this.form.valueChanges.subscribe(() => this.recalculate());

    // Pre-select a hall when arriving from a "Book" button
    this.route.queryParamMap.subscribe((p) => {
      const hall = p.get('hall');
      if (hall && this.venue.getHall(hall)) this.form.patchValue({ hallId: hall });
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private recalculate(): void {
    const v = this.form.value;
    const hall = this.venue.getHall(v.hallId);
    this.selectedHall = hall;

    this.availability = !v.date || !v.hallId
      ? 'unknown'
      : this.bookingService.isAvailable(v.hallId, v.date) ? 'available' : 'booked';

    this.overCapacity = !!hall && Number(v.guests || 0) > hall.capacity;

    const lines: EstimateLine[] = [{ label: hall ? hall.name : 'Hall', amount: hall ? hall.pricePerDay : 0 }];
    for (const id of (v.addOns || []) as string[]) {
      const add = this.venue.addOns.find((a) => a.id === id);
      if (!add) continue;
      const qty = id === 'catering' ? Math.max(1, Math.ceil(Number(v.guests || 0) / 100)) : 1;
      lines.push({ label: qty > 1 ? `${add.label} × ${qty}` : add.label, amount: add.price * qty });
    }
    const subtotal = lines.reduce((s, l) => s + l.amount, 0);
    const gst = Math.round(subtotal * 0.18);
    this.estimate = { lines, subtotal, gst, total: subtotal + gst };
  }

  toggleAddOn(id: string, checked: boolean): void {
    const current: string[] = this.form.get('addOns')!.value || [];
    const next = current.filter((x) => x !== id);
    if (checked) next.push(id);
    this.form.get('addOns')!.setValue(next);
  }

  hasAddOn(id: string): boolean {
    return (this.form.get('addOns')!.value || []).indexOf(id) !== -1;
  }

  invalid(name: string): boolean {
    const c = this.form.get(name);
    return !!c && c.invalid && (c.touched || this.triedSubmit);
  }

  eventLabel(id: string): string {
    const e = this.venue.eventTypes.find((x) => x.id === id);
    return e ? e.label : id;
  }

  hallName(id: string): string {
    const h = this.venue.getHall(id);
    return h ? h.name : id;
  }

  submit(): void {
    this.triedSubmit = true;
    if (this.form.invalid || this.availability === 'booked' || this.overCapacity) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.value;
    this.submitted = this.bookingService.save({
      hallId: v.hallId,
      date: v.date,
      eventType: v.eventType,
      guests: Number(v.guests),
      addOns: v.addOns || [],
      name: v.name,
      phone: v.phone,
      email: v.email || '',
      notes: v.notes || '',
      estimate: this.estimate.total,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  newRequest(): void {
    this.submitted = null;
    this.triedSubmit = false;
    this.form.reset({ hallId: 'grand', eventType: 'wedding', guests: 300, addOns: [] });
  }

  whatsappLink(b: BookingRequest): string {
    const text = `Hello V Convention, I've sent booking request ${b.id} for ${this.hallName(b.hallId)} on ${b.date} (${this.eventLabel(b.eventType)}, ${b.guests} guests).`;
    return `https://wa.me/${this.venue.business.whatsapp}?text=${encodeURIComponent(text)}`;
  }
}
