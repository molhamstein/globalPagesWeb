import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ArabicTranslation} from './translation/ar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private translate:TranslateService)
  {
    this.translate.setTranslation('ar',ArabicTranslation);
    this.translate.setDefaultLang('en');
    this.translate.use('ar');
  }
  title = 'globalPages';
}
