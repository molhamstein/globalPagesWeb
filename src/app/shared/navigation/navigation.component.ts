import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  english = false;
  logoAddress=''
  constructor(private translate: TranslateService) { }

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
  }
  changeLang(lang) {
    if (lang != this.translate.currentLang) {
      localStorage.setItem(environment.language, lang);
      location.reload();
      // this.translate.use(lang)
    }
  }

}
