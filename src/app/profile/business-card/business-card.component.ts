import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {

  constructor(private translteService: TranslateService) { }
  @Output() onRemove = new EventEmitter();
  @Input('business') set setbusiness(b) {
    this.business = b;
    if (b['logo'])
      this.image = b['logo']
    if (b['covers'] && b['covers'].length > 0)
      this.image = b['covers'][0]['url']
  }

  getBusinessId(business) {
    console.log("business")
    console.log(business)
    if (business.nameUnique != null)
      return business.nameUnique
    else
      return business.id
  }
  business
  image
  lang
  ngOnInit() {
    this.lang = this.translteService.currentLang
    this.translteService.onLangChange.subscribe(() => {
      this.lang = this.translteService.currentLang
    })
  }
  remove() {
    this.onRemove.emit(this.business);
  }

}
