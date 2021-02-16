import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RequestsService } from 'src/app/services/requests.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  user: any = {};
  errorMessage: string = '';
  verificationCode: boolean = false;

  constructor(private dialog: MatDialog, public thisDialog: MatDialogRef<ForgetPasswordComponent>,
    private apiService: RequestsService, private auth: AuthService) { }

  ngOnInit() {
  }

  send() {

    const value = this.checkForm();
    if (value != true) {
      this.errorMessage = value;
      return;
    }

    this.apiService.post('users/forgotPassword', this.user).subscribe(
      res => {
        this.verificationCode = true;
        this.errorMessage = '';
      },
      error => {
        this.errorMessage = error['error']['error']['code'];
      });
  }

  checkForm() {
    if (!this.user.email || this.user.email === '') {
      return 'emailIsRequired';
    }
    return true;
  }

  close() {
    this.thisDialog.close();
  }

}
