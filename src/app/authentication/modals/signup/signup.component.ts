import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { RequestsService } from 'src/app/requests.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { AuthService as SocialAuthService, SocialUser } from "angularx-social-login";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: any = { gender: '' };
  errorMessage: string = '';

  constructor(private dialog: MatDialog, public thisDialog: MatDialogRef<SignupComponent>,
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

  submit() {

    const value = this.checkForm();
    if (value != true) {
      this.errorMessage = value;
      return;
    }

    this.apiService.post('users', this.user).subscribe(
      (data) => {
        this.apiService.post('users/login', { email: this.user.email, password: this.user.password }).subscribe(
          (res) => {
            this.errorMessage = '';
            localStorage.setItem(environment.userDetails, JSON.stringify(res));
            this.auth.logIn(res);
            this.router.navigate(['profile'], { fragment: 'chooseCategory' });
            this.thisDialog.close();
          },
          (error) => {
            this.errorMessage = error['error']['error']['code'];
          });
      },
      (error) => {
        this.errorMessage = error['error']['error']['code'];
      });


  }

  checkForm() {
    if (!this.user.email || this.user.email === '') {
      return 'emailIsRequired';
    }
    if (!this.user.password || this.user.password === '') {
      return 'passwordIsRequired';
    }
    if (!this.user.username || this.user.username === '') {
      return 'usernameIsRequired';
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
