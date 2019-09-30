import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  lang: string = "";
  constructor(private ts: TranslateService) { }


  ngOnInit() {
    this.lang = this.ts.currentLang;
    this.ts.onLangChange.subscribe(() => {
      this.lang = this.ts.currentLang;
    });
    
  }

}
