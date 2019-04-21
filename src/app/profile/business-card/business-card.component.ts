import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {

  constructor(private translteService:TranslateService) { }
  @Input('business') set setbusiness(b){
    this.business=b;
    if(b['logo'])
      this.image=b['logo']
    if(b['covers'] && b['covers'].length>0)
      this.image=b['covers'][0]['url']
  }
  business
  image
  lang
  ngOnInit() {
    this.lang=this.translteService.currentLang
    this.translteService.onLangChange.subscribe(()=>{
      this.lang=this.translteService.currentLang
    })
  }

}
