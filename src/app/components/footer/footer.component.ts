import { Component } from '@angular/core';
import { VenueService } from '../../services/venue.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  constructor(public venue: VenueService) {}
}
