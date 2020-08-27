import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-ads-card',
  templateUrl: './ads-card.component.html',
  styleUrls: ['./ads-card.component.css']
})
export class AdsCardComponent implements OnInit {
  
  ad
  image 

  @Input('ad') set setAd(d) {
      this.ad = d; 
      
      if(d['media'] && d['media'].length > 0 && d['media'][0].url)
          this.image = d['media'][0].url ;
      else 
        this.image = '../../../assets/images/page/business-01.png';
  }
  @Output() onRemove=new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  remove(){
    this.onRemove.emit(this.ad);
  }

}
