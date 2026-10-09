import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <main class="page-body">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  private sub?: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private title: Title) {}

  /** Sets the browser tab title from each route's data.title */
  ngOnInit(): void {
    this.sub = this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      let r = this.route;
      while (r.firstChild) r = r.firstChild;
      const t = r.snapshot.data['title'];
      if (t) this.title.setTitle(t);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
