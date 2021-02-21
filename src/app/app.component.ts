import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ArabicTranslation } from './shared/i18n/ar';
import { EnglishTranslation } from './shared/i18n/en';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'globalPages';

  constructor(private translate: TranslateService) {
    this.translate.setTranslation('ar', ArabicTranslation);
    this.translate.setTranslation('en', EnglishTranslation);
    this.translate.setDefaultLang('en');
    this.translate.use('ar');
  }

  addFooter() {
    var path: string = window.location.pathname;
    return (!path.includes('auth'))
  }
}
