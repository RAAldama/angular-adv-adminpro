import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContollerComponent } from './contoller/contoller.component';
import { FormsModule } from '@angular/forms';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    ContollerComponent,
    DoughnutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    ContollerComponent,
    DoughnutComponent
  ]
})
export class ComponentsModule { }
