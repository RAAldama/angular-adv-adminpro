import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphic1',
  templateUrl: './graphic1.component.html',
  styles: [
  ]
})
export class Graphic1Component implements OnInit {

  public labels1: string[] = ['Rebel forces', 'Imperial forces', 'Jedi Knights'];
  public data1 = [
    [400, 750, 100],
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
