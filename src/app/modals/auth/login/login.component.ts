import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService as SocialAuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { RequestsService } from 'src/app/services/requests.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {};
  errorMessage: string = '';

  constructor(private dialog: MatDialog, public thisDialog: MatDialogRef<LoginComponent>,
    private apiService: RequestsService, private router: Router,
    private auth: AuthService, private socialAuthService: SocialAuthService) { }

  ngOnInit() {
  }

  loginWithFacebook() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res: SocialUser) => {
      this.errorMessage = '';
      const loginData = {
        data: {
          socialId: res.id,
          image: res.facebook.picture.data.url,
          email: res.email,
          username: res.name,
        },
        type: "facebook"
      };
      this.apiService.post('users/socialLogin', loginData).subscribe(
        (user: any) => {
          const userData = user.user;
          this.errorMessage = '';
          let data: any = {};
          if (!userData.email) data.email = '';
          if (!userData.phoneNumber) data.phoneNumber = '';
          if (!userData.gender) data.gender = '';
          data.id = userData.id;
          if (data.email || data.phoneNumber || data.gender)
            this.thisDialog.close({ data: data, event: 'complete' });
          else {
            localStorage.setItem(environment.userDetails, JSON.stringify(user));
            this.auth.logIn(user);
            this.router.navigate(['']);
            this.thisDialog.close();
          }
        },
        error => {
          this.errorMessage = 'emailAlreadyExsit';
        }
      );
    });
  }

  loginWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res: SocialUser) => {
      this.errorMessage = '';
      const loginData = {
        data: {
          socialId: res.id,
          image: res.photoUrl,
          email: res.email,
          username: res.name,
        },
        type: "google"
      };
      this.apiService.post('users/socialLogin', loginData).subscribe(
        (user: any) => {
          const userData = user.user;
          this.errorMessage = '';
          let data: any = {};
          if (!userData.email) data.email = '';
          if (!userData.phoneNumber) data.phoneNumber = '';
          if (!userData.gender) data.gender = '';
          data.id = userData.id;
          if (data.email || data.phoneNumber || data.gender)
            this.thisDialog.close({ data: data, event: 'complete' });
          else {
            localStorage.setItem(environment.userDetails, JSON.stringify(user));
            this.auth.logIn(user);
            this.router.navigate(['']);
            this.thisDialog.close();
          }
        },
        error => {
          this.errorMessage = 'emailAlreadyExsit';
        }
      );
    });
  }

  login() {

    const value = this.checkForm();
    if (value != true) {
      this.errorMessage = value;
      return;
    }

    this.apiService.post('users/login', this.user).subscribe(
      res => {
        this.errorMessage = '';
        localStorage.setItem(environment.userDetails, JSON.stringify(res));
        this.auth.logIn(res);
        this.router.navigate(['']);
        this.thisDialog.close();
      },
      error => {
        this.errorMessage = error['error']['error']['code'];
      });
  }

  register() {
    this.thisDialog.close({ event: 'register' });
  }

  forgotPassword() {
    this.thisDialog.close({ event: 'forgot' });
  }

  checkForm() {
    if (!this.user.email || this.user.email === '') {
      return 'emailIsRequired';
    }
    if (!this.user.password || this.user.password === '') {
      return 'passwordIsRequired';
    }
    return true;
  }

  close() {
    this.thisDialog.close();
  }

}
