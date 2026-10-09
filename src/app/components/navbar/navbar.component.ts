import { Component, HostListener } from '@angular/core';
import { VenueService } from '../../services/venue.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  menuOpen = false;
  scrolled = false;

  readonly links = [
    { path: '/', label: 'Home', exact: true },
    { path: '/booking', label: 'Booking', exact: false },
    { path: '/contact', label: 'Contact Us', exact: false },
  ];

  constructor(public venue: VenueService) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 24;
  }

  toggle(): void {
    this.menuOpen = !this.menuOpen;
  }

  close(): void {
    this.menuOpen = false;
  }
}
