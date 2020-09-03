import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../authentication/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoginComponent } from 'src/app/authentication/modals/login/login.component';
import { SignupComponent } from 'src/app/authentication/modals/signup/signup.component';
import { ForgetPasswordComponent } from 'src/app/authentication/modals/forget-password/forget-password.component';
import { CompleteInformationComponent } from 'src/app/authentication/modals/complete-information/complete-information.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  english = false;
  logoAddress = '';
  user;
  isLogin;

  constructor(private translate: TranslateService, public auth: AuthService,
    private router: Router, private CD: ChangeDetectorRef, private dialog: MatDialog) { }

  ngOnInit() {
    var selectedLanguage = localStorage.getItem(environment.language);
    if (selectedLanguage != null) {
      if (selectedLanguage == 'en') {
        this.english = true;
      }
      this.translate.use(selectedLanguage);
    }
    if (this.translate.currentLang == 'ar') {
      this.logoAddress = 'assets/images/page/logo_arabic.svg';
    }
    else {
      this.logoAddress = 'assets/images/page/logo_english.svg';
    }

    this.auth.loginStatus.subscribe(login => {
      this.isLogin = login;
    });

    this.auth.userData.subscribe(data => {
      this.user = null;
      setTimeout(() => {
        this.user = data;
        this.CD.markForCheck();
        this.CD.detectChanges();
      });
    });
  }

  changeLang(lang) {
    if (lang != this.translate.currentLang) {
      localStorage.setItem(environment.language, lang);
      location.reload();
    }
  }

  goToProfile() {
    this.router.navigate(['profile'])
  }

  onLogin() {
    let dialogRef = this.dialog.open(LoginComponent, {
      panelClass: 'communictioDialogStyle',
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        if (data.event && data.event === 'register') {
          this.dialog.open(SignupComponent, {
            panelClass: 'communictioDialogStyle',
          });
        }
        if (data.event && data.event === 'forgot') {
          this.dialog.open(ForgetPasswordComponent, {
            panelClass: 'communictioDialogStyle',
          });
        }
        if (data.event && data.event === 'complete') {
          this.dialog.open(CompleteInformationComponent, {
            panelClass: 'communictioDialogStyle',
            data: data.data
          });
        }
      }
    });
  }

  onSignup() {
    let dialogRef = this.dialog.open(SignupComponent, {
      panelClass: 'communictioDialogStyle',
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        if (data.event && data.event === 'complete') {
          this.dialog.open(CompleteInformationComponent, {
            panelClass: 'communictioDialogStyle',
            data: data.data
          });
        }
      }
    });
  }

}
