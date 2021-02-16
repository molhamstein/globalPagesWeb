import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  user: any = {};
  errorMessage: string = '';
  verificationCode: boolean = false;

  constructor(private dialog: MatDialog, public thisDialog: MatDialogRef<ResetPasswordComponent>,
    private apiService: RequestsService, private router: Router) { }

  ngOnInit() {
  }

  send() {

    const value = this.checkForm();
    if (value != true) {
      this.errorMessage = value;
      return;
    }

    this.apiService.post('users/resetPassword', this.user).subscribe(
      res => {
        this.errorMessage = '';
        this.router.navigate(['/']);
      },
      error => {
        this.errorMessage = error['error']['error']['code'];
      });
  }

  checkForm() {
    if (!this.user.verificationCode || this.user.verificationCode === '') {
      return 'verificationCodeIsRequired';
    }
    if (!this.user.password || this.user.password === '') {
      return 'passwordIsRequired';
    }
    if (!this.user.repassword || this.user.repassword === '') {
      return 'confirmPasswordIsRequired';
    }
    if (this.user.password && this.user.repassword
      && this.user.password !== this.user.repassword) {
      return 'confirmPasswordAndPasswordNotSame';
    }
    return true;
  }

  close() {
    this.thisDialog.close();
  }

}
