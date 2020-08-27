import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.component.html',
  styleUrls: ['./map-marker.component.css']
})
export class MapMarkerComponent implements OnInit {

  constructor(private tr: TranslateService) { }
  @Input() data;
  ngOnInit() {
    if (this.tr.currentLang == 'ar'){
      this.data['name']=this.data['nameAr']
    }else{
      this.data['name']=this.data['nameEn']

    }
    // console.warn(this.data)
  }


}
