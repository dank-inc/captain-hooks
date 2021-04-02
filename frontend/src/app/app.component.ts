import { Component, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private componentResolver: ComponentFactoryResolver) {}

  // subject
  // subject on message => showError(message)

  showError(message: string) {}
}
