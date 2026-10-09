import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VenueService } from '../../services/venue.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  sent = false;
  openFaq: number | null = 0;
  form: FormGroup;
  mapUrl: SafeResourceUrl;

  readonly faqs = [
    { q: 'How early should we book?', a: 'Popular muhurtham dates fill 4–8 months ahead. We recommend booking as soon as your date is fixed.' },
    { q: 'Can we bring our own caterer and decorator?', a: 'Yes. You can use our trusted partners or bring your own — our kitchen and stage are available either way.' },
    { q: 'What is the advance amount?', a: 'A 25% advance confirms your date. The balance is due one week before the event.' },
    { q: 'Do you allow site visits?', a: 'Of course. Visit any day between 9 AM and 9 PM, or call ahead and our coordinator will show you around.' },
  ];

  constructor(public venue: VenueService, private fb: FormBuilder, sanitizer: DomSanitizer) {
    this.mapUrl = sanitizer.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?q=${encodeURIComponent(venue.business.address)}&output=embed`,
    );
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[+\d][\d\s-]{9,14}$/)]],
      subject: ['Site visit'],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  toggleFaq(i: number): void {
    this.openFaq = this.openFaq === i ? null : i;
  }

  invalid(name: string): boolean {
    const c = this.form.get(name);
    return !!c && c.invalid && c.touched;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Hook up to your backend / email service here (HttpClient).
    this.sent = true;
    this.form.reset({ subject: 'Site visit' });
  }
}
