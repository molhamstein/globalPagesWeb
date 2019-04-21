import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import {AuthService} from '../../authentication/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  english = false;
  logoAddress=''
  user
  isLogin
  constructor(private translate: TranslateService,public auth:AuthService,private router:Router,private CD:ChangeDetectorRef) { }

  ngOnInit() {
    var selectedLanguage = localStorage.getItem(environment.language);
    if (selectedLanguage != null) {
      if (selectedLanguage=='en'){
        this.english = true;
      }
      this.translate.use(selectedLanguage)

    }
    if (this.translate.currentLang == 'ar') {
      this.logoAddress = 'assets/images/page/logo_arabic.svg'
    } else {
      this.logoAddress = 'assets/images/page/logo_english.svg'
    }

    this.auth.loginStatus.subscribe(login=>{
      this.isLogin=login
    })
    this.auth.userData.subscribe(data=>{
      this.user=null;
      setTimeout(()=>{
        this.user=data;
        console.log(data)
        this.CD.markForCheck()
        this.CD.detectChanges()
      })
    })
  }
  changeLang(lang) {
    if (lang != this.translate.currentLang) {
      localStorage.setItem(environment.language, lang);
      location.reload();
      // this.translate.use(lang)
    }
  }
  goToProfile(){
    this.router.navigate(['profile'])
  }

}
