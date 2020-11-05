import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {
  intervalSubs: Subscription;

  constructor() { 

    /*
    this.returnObservable().pipe(
      retry(2)
    ).subscribe(
      value => console.log('subs', value),
      err => console.warn(err),
      () => console.info('obs terminado')
    );
    */

    this.intervalSubs = this.returnInterval().subscribe(console.log);

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  returnInterval(): Observable<number>{
    return interval(100).pipe(
      take(10),
      map(value => {
        return value + 1;
      }),
      filter(value => (value % 2 === 0) ? true : false),
    )
  }

  returnObservable(): Observable<number>{
    let i = 0;
    
    const obs$ = new Observable<number>(observer => {
      const interval = setInterval(() => {
        i++;

        observer.next(i);

        if(i === 4){
          clearInterval(interval);
          observer.complete();
        }

        if(i === 2){
          observer.error('i llego a 2 de error');
        }
      }, 1000)
    }); 

    return obs$;
  }

}
