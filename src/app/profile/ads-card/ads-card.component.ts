import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ads-card',
  templateUrl: './ads-card.component.html',
  styleUrls: ['./ads-card.component.css']
})
export class AdsCardComponent implements OnInit {

  @Input() ad
  constructor() { }

  ngOnInit() {
  }

}
