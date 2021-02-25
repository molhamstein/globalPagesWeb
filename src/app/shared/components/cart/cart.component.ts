import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/services/requests.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  showCart: boolean = false;
  orders: any[];

  constructor(
    private api: RequestsService,
    private router: Router) { }

  ngOnInit() {
    let params = new HttpParams();
    params = params.set('filter', JSON.stringify({
      where: {
        businessOwnerId: JSON.parse(localStorage.getItem(environment.userDetails)).userId
      },
      order: "creationDate DESC"
    }));

    this.api.get('orders', params).subscribe((response: any) => {
      this.orders = response;
    });
  }

  open() {
    this.showCart = !this.showCart;
  }

  goToProduct(productId: string) {
    this.router.navigate([`products/${productId}`]);
  }

}
