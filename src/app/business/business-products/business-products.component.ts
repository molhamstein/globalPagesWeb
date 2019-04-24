import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-business-products',
  templateUrl: './business-products.component.html',
  styleUrls: ['./business-products.component.css'],
  exportAs:'products'
})
export class BusinessProductsComponent implements OnInit {

  constructor() { }
  @Input('products') set productsSetter(temp){
    this.products=temp;
    this.reset();
  }
  products=[]
  _products
  @Output() productHasChanged=new EventEmitter();
  index
  add(){
    if(this._products) {
      this._products.push({});
      this.index=this._products.length-1;
    }
  }
  deleteProduct(index){
    this._products.splice(index,1)
  }
  ngOnInit() {
  }
  reset(){
    this.index=0;
    if (this.products){
      this._products=this.products.map((o)=>{return {...o}})
    }
  }

}
