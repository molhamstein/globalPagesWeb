import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {

  constructor(private translteService:TranslateService) { }
  @Input() business
  lang
  ngOnInit() {
    this.lang=this.translteService.currentLang
    this.translteService.onLangChange.subscribe(()=>{
      this.lang=this.translteService.currentLang
    })
  }

}
