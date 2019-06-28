import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-ads-card',
  templateUrl: './ads-card.component.html',
  styleUrls: ['./ads-card.component.css']
})
export class AdsCardComponent implements OnInit {

  @Input() ad
  @Output() onRemove=new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  remove(){
    this.onRemove.emit(this.ad);
  }

}
