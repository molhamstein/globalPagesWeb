import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { SMSService } from 'src/app/services/sms.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-send-verification-code',
  templateUrl: './send-verification-code.component.html',
  styleUrls: ['./send-verification-code.component.css']
})
export class SendVerificationCodeComponent implements OnInit {

  data = { code: '' };
  errorMessage: string = '';
  showSendButton = false;

  constructor(
    private dialog: MatDialog,
    public thisDialog: MatDialogRef<SendVerificationCodeComponent>,
    private router: Router,
    private smsService: SMSService
  ) { }

  ngOnInit() {
    this.sendNewCode();
  }

  submit() {

    const value = this.checkForm();
    if (value != true) {
      this.errorMessage = value;
      return;
    }

    let userDetails = JSON.parse(localStorage.getItem(environment.userDetails));
    this.smsService.activateUser(this.data.code, userDetails.userId).subscribe(
      response => {
        userDetails.user.status = "activated";
        localStorage.setItem(environment.userDetails, JSON.stringify(userDetails));
        this.router.navigate(['/']);
        this.close();
      },
      error => {
        console.error(error);
      }
    );

  }

  sendNewCode() {
    this.showSendButton = false;
    let userDetails = JSON.parse(localStorage.getItem(environment.userDetails));
    this.smsService.sendNewCode(userDetails.userId).subscribe(
      response => {
        setTimeout(() => { this.showSendButton = true }, 15000);
      },
      error => {
        setTimeout(() => { this.showSendButton = true }, 15000);
        console.error(error);
      }
    );
  }

  checkForm() {
    if (!this.data.code || this.data.code === '') {
      return 'verificationCodeIsRequired';
    }
    return true;
  }

  close() {
    this.thisDialog.close();
  }
}
