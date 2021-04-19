import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SendVerificationCodeComponent } from 'src/app/modals/sms/send-verification-code/send-verification-code.component';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.dialog.open(SendVerificationCodeComponent, {
      panelClass: 'communictioDialogStyle',
    });
  }

}
