import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import { icon, latLng, marker,  Marker, tileLayer } from 'leaflet';
@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LocationPickerComponent),
      multi: true
    }
  ],
})
export class LocationPickerComponent implements OnInit, ControlValueAccessor {

  constructor() { }
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    ],
    zoom: 13,
    maxZoom:15,
    minZoom:11,
    center: latLng(33.5102, 36.29128)
  };
  map
  onMapReady(map){
    this.map = map;
  }
  _value
  set value(v){
    this._value=v;
    this.refresh();
    this.onChanged(v)
  }
  get value() {
    return this._value
  }
  onChanged=(v)=>{}
  onTouched=()=>{}

  registerOnChange(fn: any): void {
    this.onChanged=fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched=fn
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
      this._value=obj
      this.refresh()
  }
  ngOnInit() {
  }
  clicked(event){
    this.value=event.latlng;
  }
  marker
  refresh(){
    if(this.marker)
      this.marker.removeFrom(this.map);
    this.marker = marker(new latLng(this.value), {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png'
      })
    });
    this.marker.addTo(this.map);
  }

}
