import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit {

  errorMessage: string = '';
  order: any = { count: null, note: null, address: null, phone: null, productId: null };



  constructor(
    private dialog: MatDialog,
    public thisDialog: MatDialogRef<MakeOrderComponent>,
    private apiService: RequestsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.order.productId = data['id'];
    console.log(this.order);
  }

  ngOnInit() {

  }

  submit() {
    const value = this.checkForm();
    if (value != true) {
      this.errorMessage = value;
      return;
    }

    if (this.order.note === null) delete this.order.note;

    console.log(this.order);


    this.apiService.post('orders/makeOrder', this.order).subscribe(
      response => {
        console.log(response);
        this.close();
      },
      error => {
        this.close(error);
      }
    );
  }

  checkForm() {
    if (this.order.count != null && this.order.count <= 0) {
      return 'countIsRequired';
    }
    if (this.order.phoneNumber != null && this.order.phoneNumber === "") {
      return 'phoneNumberIsRequired';
    }
    if (this.order.address != null && this.order.address === "") {
      return 'addressIsRequired';
    }
    return true;
  }

  close(data?: any) {
    this.thisDialog.close(data);
  }

}
