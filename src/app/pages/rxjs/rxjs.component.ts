import { Component, OnDestroy } from '@angular/core';
import { createUrlTreeFromSnapshot } from '@angular/router';
import {
  Observable,
  interval,
  map,
  retry,
  take,
  filter,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [],
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css',
})
export class RxjsComponent implements OnDestroy {
  public intervalSubs!: Subscription;
  constructor() {
    /*  this.retornaObservable()
      .pipe(retry(1))
      .subscribe(
        (valor) => console.log('Subscribed', valor),
        (error) => console.warn('Error', error),
        () => console.info('Completado')
      ); */

    this.intervalSubs = this.retornaInterval().subscribe(console.log);
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaInterval(): Observable<number> {
    return interval(500).pipe(
      map((valor) => valor + 1),
      filter((valor) => (valor % 2 == 0 ? true : false))
    );
  }
  retornaObservable(): Observable<number> {
    let i = 0;
    return new Observable<number>((observer) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }
        if (i === 2) {
          observer.error('i llego al valor de 2');
        }
      }, 1000);
    });
  }
}
