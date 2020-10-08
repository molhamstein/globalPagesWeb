import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { RequestsService } from 'src/app/requests.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-complete-information',
  templateUrl: './complete-information.component.html',
  styleUrls: ['./complete-information.component.css']
})
export class CompleteInformationComponent implements OnInit {


  errorMessage: string = '';
  user: any = { email: null, phoneNumber: null, gender: null };

  constructor(private dialog: MatDialog, public thisDialog: MatDialogRef<CompleteInformationComponent>,
    private apiService: RequestsService, private router: Router, private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = {
      ...this.user,
      ...data
    };
  }

  ngOnInit() {

  }


  submit() {

    const value = this.checkForm();
    if (value != true) {
      this.errorMessage = value;
      return;
    }

    if(this.user.email === null) delete this.user.email;
    if(this.user.phoneNumber === null) delete this.user.phoneNumber;
    if(this.user.gender === null) delete this.user.gender;

 
    this.apiService.put('users/' + this.user.id, this.user).subscribe(
      (res:any) => {
        res.userId = res.id; 
        localStorage.setItem(environment.userDetails, JSON.stringify(res));
        this.auth.logIn(res);
        this.router.navigate(['']);
        this.thisDialog.close();
      },
      error => {
        this.errorMessage = 'LOGIN_FAILED';
      });
  }

  checkForm() {
    if (this.user.email != null && this.user.email === '') {
      return 'emailIsRequired';
    }
    if (this.user.phoneNumber != null && this.user.phoneNumber === "") {
      return 'phoneNumberIsRequired';
    }
    if (this.user.gender != null && this.user.gender === "") {
      return 'genderIsRequired';
    }
    return true;
  }

  close() {
    this.thisDialog.close();
  }

}
