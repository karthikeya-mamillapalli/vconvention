import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface BookingRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventType: string;
  hallId: string;
  date: string; // yyyy-mm-dd
  guests: number;
  addOns: string[];
  notes: string;
  estimate: number;
  createdAt: string;
}

const STORAGE_KEY = 'vconvention.bookings';

/**
 * Keeps booking requests and answers availability questions.
 *
 * This version stores requests in the browser (localStorage) so the site works
 * with no server. To go live, replace `save()` and `load()` with HttpClient calls
 * to your backend (or a service such as Firebase / Formspree) — the pages don't change.
 */
@Injectable({ providedIn: 'root' })
export class BookingService {
  /** Dates already taken, per hall. Seeded with a few sample dates. */
  private readonly seededBlocked: { [hallId: string]: string[] } = this.sampleBlockedDates();

  private readonly bookingsSubject = new BehaviorSubject<BookingRequest[]>(this.load());
  readonly bookings$ = this.bookingsSubject.asObservable();

  get bookings(): BookingRequest[] {
    return this.bookingsSubject.value;
  }

  isAvailable(hallId: string, date: string): boolean {
    if (!hallId || !date) return true;
    const seeded = this.seededBlocked[hallId] || [];
    const requested = this.bookings.some((b) => b.hallId === hallId && b.date === date);
    return seeded.indexOf(date) === -1 && !requested;
  }

  save(request: Omit<BookingRequest, 'id' | 'createdAt'>): BookingRequest {
    const booking: BookingRequest = {
      ...request,
      id: 'VC' + Date.now().toString(36).toUpperCase().slice(-6),
      createdAt: new Date().toISOString(),
    };
    this.bookingsSubject.next([booking, ...this.bookings]);
    this.persist();
    return booking;
  }

  private load(): BookingRequest[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as BookingRequest[]) : [];
    } catch {
      return [];
    }
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.bookings));
    } catch {
      /* storage unavailable — the booking still shows for this visit */
    }
  }

  /** A few upcoming weekend dates marked as booked so availability feels real. */
  private sampleBlockedDates(): { [hallId: string]: string[] } {
    const fmt = (d: Date) => d.toISOString().slice(0, 10);
    const out: { [hallId: string]: string[] } = { grand: [], lotus: [], garden: [] };
    const d = new Date();
    for (let i = 3; i < 90; i++) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() === 0 && i % 2 === 0) out['grand'].push(fmt(d));
      if (d.getDay() === 6 && i % 3 === 0) out['lotus'].push(fmt(d));
      if (d.getDay() === 5 && i % 4 === 0) out['garden'].push(fmt(d));
    }
    return out;
  }
}
