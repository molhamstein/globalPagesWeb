import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.component.html',
  styleUrls: ['./map-marker.component.css']
})
export class MapMarkerComponent implements OnInit {

  constructor() { }
  @Input() data;
  ngOnInit() {
    // console.warn(this.data)
  }


}
