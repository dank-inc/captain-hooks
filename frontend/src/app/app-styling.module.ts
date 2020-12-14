export class AppStylingModule {
  // possibly a component
  // sets global variables
  // renders all children
}

/* OPTION 1

@Component({
  selector: 'app',
  template: `
    <link rel="stylesheet" href="styles/{{ current }}">
    ...`
})
export class AppComponent {
    current = 'site1.css';
}

*/

/* OPTION 2 

import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({})
export class MyClass {
    constructor (@Inject(DOCUMENT) private document) { }

    ngOnInit() {
      this.document.getElementById('theme').setAttribute('href', 'blue.css');
    }
}

*/
