import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { PagesComponent } from '../../pages/pages.component';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [PagesComponent],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css',
})
export class BreadcrumbsComponent implements OnDestroy {
  pageTitle!: string;
  titleSubs$!: Subscription;
  constructor(private route: Router) {
    this.titleSubs$ = this.getArgsRoutes().subscribe((data) => {
      this.pageTitle = data;
      document.title = `AppHospital - ${data}`;
    });
  }
  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  getArgsRoutes() {
    return this.route.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: any) => event.snapshot.firstChild === null),
      map((event) => event.snapshot.data['title'])
    );
  }
}
