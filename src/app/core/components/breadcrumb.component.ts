import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET, RouterLink } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { BaseComponent } from './base.component';
import { BreadcrumbModel } from '../model/breadcrumb.model';

// <ol class="breadcrumb">
// <li><a routerLink="" class="breadcrumb">Home</a></li>
// <li *ngFor="let breadcrumb of breadcrumbs">
//   <a [routerLink]="[breadcrumb.url, breadcrumb.params]">{{breadcrumb.label}}</a>
// </li>
// </ol>

@Component({
  selector: 'app-breadcrumb',
  template: `
  <ol class="au-breadcrumb">
  <li><a  > صفحه اصلی </a></li>
  <li *ngFor="let breadcrumb of breadcrumbs">
    <a >{{breadcrumb.name}}</a>
  </li>
</ol>
  `
})
export class BreadcrumbComponent extends BaseComponent {

  breadcrumbs: BreadcrumbModel[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    super();
    this.breadcrumbs = [];
  }

  ngOnInitHandler() {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      const root: ActivatedRoute = this.activatedRoute.root;
      this.breadcrumbs = this.getBreadcrumbs(root);
    });
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbModel[] = []): BreadcrumbModel[] {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }
    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      url += `/${routeURL}`;
      const breadcrumb: BreadcrumbModel = {
        name: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };
      breadcrumbs.push(breadcrumb);
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

}
