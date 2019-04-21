import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-business-products',
  templateUrl: './business-products.component.html',
  styleUrls: ['./business-products.component.css']
})
export class BusinessProductsComponent implements OnInit {

  constructor() { }
  @Input()  products=[];
  @Output() productHasChanged=new EventEmitter();
  add(){

  }
  deleteProduct(index){

  }
  ngOnInit() {
  }

}
