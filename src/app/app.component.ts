import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ArabicTranslation } from './shared/translation/ar';
import { EnglishTranslation } from './shared/translation/en';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // public categories: Object={};
  constructor(private translate: TranslateService) {

    this.translate.setTranslation('ar', ArabicTranslation);
    this.translate.setTranslation('en', EnglishTranslation);
    this.translate.setDefaultLang('en');
    this.translate.use('ar');
  }
  title = 'globalPages';
  addFooter() {
    var path: string = window.location.pathname;
    return (!path.includes('auth'))
  }
}
