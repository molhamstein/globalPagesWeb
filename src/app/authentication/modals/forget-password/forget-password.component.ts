import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { RequestsService } from 'src/app/requests.service';
import { AuthService } from '../../auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  user: any = {};
  errorMessage: string = '';
  verificationCode: boolean = false; 

  constructor(private dialog: MatDialog, public thisDialog: MatDialogRef<LoginComponent>,
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
        this.verificationCode = true ; 
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
