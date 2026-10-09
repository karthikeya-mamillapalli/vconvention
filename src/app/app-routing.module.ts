import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookingComponent } from './pages/booking/booking.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'V Convention | Kalyana Mandapam' } },
  { path: 'booking', component: BookingComponent, data: { title: 'Book Your Date | V Convention' } },
  { path: 'contact', component: ContactComponent, data: { title: 'Contact Us | V Convention' } },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Hash URLs (#/booking) work on any static host with no server rewrite rules.
      // Set useHash to false if your host supports SPA fallback.
      useHash: true,
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
