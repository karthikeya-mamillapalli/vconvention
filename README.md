# V Convention — Kalyana Mandapam Website (Angular 12)

Angular 12.2 + Bootstrap 5.1 website with Home, Booking and Contact Us pages, a shared top bar and footer.
Uses the classic NgModule structure (`AppModule`, `AppRoutingModule`), `*ngIf` / `*ngFor` and Reactive Forms.

## Run it

```bash
npm install
```

Then pick the command that matches your Node.js version (check with `node -v`):

| Node.js version | Start dev server | Production build |
|---|---|---|
| 12.14+, 14.x or 16.x (officially supported by Angular 12) | `npm start` | `npm run build` |
| 17 or newer (18, 20, 22…) | `npm run start:newnode` | `npm run build:newnode` |

Newer Node versions block an old hashing method that Angular 12's build tools use, which shows up as
`error:0308010C:digital envelope routines::unsupported`. The `:newnode` scripts turn that method back on.

The dev server opens at http://localhost:4200. The production build goes to `dist/v-convention`.

## Change the content

Everything shown on the site — business name, phone, address, halls, prices, add-ons,
amenities, reviews — lives in **`src/app/services/venue.service.ts`**. Edit it and the
whole site updates.

## What's dynamic

- **Booking page**: choose a hall (or arrive from a hall's "Book" button), pick a date and
  see live availability, add services, and watch the estimate (with GST) update as you go.
  Form validation, a confirmation screen with a reference number, a WhatsApp confirm link,
  and a list of your recent requests.
- **Home**: venues, amenities, stats and reviews are rendered from data; reviews rotate.
- **Contact**: validated message form, FAQ accordion, embedded map.

## Going live

Booking requests are currently saved in the visitor's browser (`localStorage`) so the site
runs with no server. To receive them yourself, replace `save()` in
`src/app/services/booking.service.ts` with an `HttpClient` call to your backend or a form
service (Firebase, Formspree, Google Apps Script, etc.). Do the same for `submit()` in the
contact page. Remember to add `HttpClientModule` to `imports` in `app.module.ts`.

The app uses hash URLs (`/#/booking`) so it works on any static host (Netlify, GitHub Pages,
Hostinger, cPanel). Upload the contents of `dist/v-convention`.

## Structure

```
src/app/
  app.module.ts          declares all components
  app-routing.module.ts  routes: '', 'booking', 'contact'
  components/navbar      top bar + sticky navigation
  components/footer      footer
  pages/home             landing page
  pages/booking          booking form + live estimate
  pages/contact          contact form, map, FAQ
  services/              venue data + booking logic
```
