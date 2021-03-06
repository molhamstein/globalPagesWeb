import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-add-rate',
  templateUrl: './add-rate.component.html',
  styleUrls: ['./add-rate.component.css']
})
export class AddRateComponent implements OnInit {

  errorMessage: string = '';
  rate: any = {};
  id: string = '';

  constructor(private dialog: MatDialog, public thisDialog: MatDialogRef<AddRateComponent>,
    private apiService: RequestsService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data['id'];
  }

  ngOnInit() {
  }

  checkForm() {
    if (!this.rate.value || this.rate.value === '') {
      return 'starIsRequired';
    }
    return true;
  }

  sendRate() {
    this.apiService.post('marketProducts/' + this.id + '/rateProduct', this.rate).subscribe(
      res => {
        this.thisDialog.close(res);
      },
      error => {
        this.thisDialog.close(error);
      },
    );
  }

  close() {
    this.thisDialog.close();
  }

}
