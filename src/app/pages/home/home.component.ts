import { Component, OnDestroy, OnInit } from '@angular/core';
import { VenueService } from '../../services/venue.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  activeQuote = 0;
  readonly petals = [0, 45, 90, 135, 180, 225, 270, 315];
  private timer?: ReturnType<typeof setInterval>;

  constructor(public venue: VenueService) {}

  ngOnInit(): void {
    this.start();
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  next(): void {
    this.activeQuote = (this.activeQuote + 1) % this.venue.testimonials.length;
  }

  go(i: number): void {
    this.activeQuote = i;
    this.start();
  }

  private start(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => this.next(), 6000);
  }
}
