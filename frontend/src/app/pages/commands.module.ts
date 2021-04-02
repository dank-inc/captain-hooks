// @ts-nocheck

@Component({
  template: `<div>
    <sidebar>
      <a routerLink="">Overview</a>
      <a routerLink="thing-one">thing-one</a>
      <a routerLink="thing-two">thing-two</a>
    </sidebar>
    <router-outlet>
  </div>`,
})
class LayoutComponent {}

// ... other components etc

import { Component } from '@angular/core';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: OverviewComponent },
      { path: 'thing-one', component: ThingOneComponent },
      { path: 'thing-two', component: ThingTwoComponent },
    ],
  },
];
