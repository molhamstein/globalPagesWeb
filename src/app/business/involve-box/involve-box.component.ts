import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-involve-box',
  templateUrl: './involve-box.component.html',
  styleUrls: ['./involve-box.component.css']
})
export class InvolveBoxComponent implements OnInit {

  constructor() { }
  @Input() product
  ngOnInit() {
  }

}
