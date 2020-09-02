import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { RequestsService } from 'src/app/requests.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-complete-information',
  templateUrl: './complete-information.component.html',
  styleUrls: ['./complete-information.component.css']
})
export class CompleteInformationComponent implements OnInit {

  user: any = {};
  errorMessage: string = '';

  constructor(private dialog: MatDialog, public thisDialog: MatDialogRef<LoginComponent>,
    private apiService: RequestsService, private router: Router) { }

  ngOnInit() {
  }


  submit() {

    const value = this.checkForm();
    if (value != true) {
      this.errorMessage = value;
      return;
    }


  }

  checkForm() {
    if (!this.user.email || this.user.email === '') {
      return 'emailIsRequired';
    }
    if (!this.user.phoneNumber || this.user.phoneNumber === '') {
      return 'phoneNumberIsRequired';
    }
    return true;
  }

  close() {
    this.thisDialog.close();
  }

}
