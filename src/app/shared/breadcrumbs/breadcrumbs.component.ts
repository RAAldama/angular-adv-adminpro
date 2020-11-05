import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  title: string;
  titleSubs$: Subscription;

  constructor(private router: Router) { 
    this.titleSubs$ = this.getRuteData().subscribe(data => {
      this.title = data.title;
      document.title = `AdminPro | ${data.title}`;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  getRuteData(){
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    )
  }

}
