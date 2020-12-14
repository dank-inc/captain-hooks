import { Component, ComponentFactoryResolver } from '@angular/core';
import { AlertComponent } from './components/shared/alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private componentResolver: ComponentFactoryResolver) {}

  // subject
  // subject on message => showError(message)

  showError(message: string) {
    const factory = this.componentResolver.resolveComponentFactory(
      AlertComponent
    );
  }
}
