import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-contoller',
  templateUrl: './contoller.component.html',
  styles: [
  ]
})
export class ContollerComponent implements OnInit {

  @Input('value') progress: number = 50;
  @Input() btnClass: string = "btn-primary";
  @Output('value') valueOutput: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`
  }

  changeValue(value: number){
    if(this.progress >= 100 && value >= 0){
      this.valueOutput.emit(100);
      return this.progress = 100;
    }

    if(this.progress <= 0 && value < 0){
      this.valueOutput.emit(0);
      return this.progress = 0;
    }

    this.progress = this.progress + value;
    this.valueOutput.emit(this.progress);
  }

  onChange(value: number){
    if(value >= 100){
      this.progress = 100;
    }else if(value <= 0){
      this.progress = 0;
    }else{
      this.progress = value;
    }

    this.valueOutput.emit(this.progress);
  }

}
