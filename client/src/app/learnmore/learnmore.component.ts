import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-learnmore',
  templateUrl: './learnmore.component.html',
  styleUrls: ['./learnmore.component.css']
})
export class LearnmoreComponent implements OnInit{
  @Output() cancelLearnmore = new EventEmitter();
  
  constructor() {}

  ngOnInit(): void {
  }

  cancel(){
    this.cancelLearnmore.emit(false);
  }


}
