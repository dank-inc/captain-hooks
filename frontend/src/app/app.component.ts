import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Captain Hooks';

  subscription!: Subscription;

  constructor() {}

  ngOnInit() {
    let n = 0;

    const obs = new Observable((observer) => {
      setInterval(() => {
        observer.next(n);
        if (n === 3) observer.complete();
        if (n > 3) observer.error(new Error('AHHHH'));
        n++;
      }, 1000);
    });

    const mapper = obs.pipe(
      map((data) => {
        return (data as number) * 10;
      })
    );

    this.subscription = mapper.subscribe(
      (n) => console.log(n),
      (err) => console.log(err),
      () => console.log('complete')
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
