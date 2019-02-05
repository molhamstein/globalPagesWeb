import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  localAddress=''
  logoAddress=''
  constructor(private ts: TranslateService) { }

  ngOnInit() {
    this.localAddress = window.location.href;
    if(this.ts.currentLang == 'ar'){
      this.logoAddress = 'assets/images/page/logo_arabic_white.svg';
    }else{
      this.logoAddress = 'assets/images/page/logo_english_white.svg';
    }
  }

}
