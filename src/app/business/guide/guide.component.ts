import { Component, OnInit, ComponentFactoryResolver, ComponentRef, Injector, DoCheck } from '@angular/core';
import { CommonDataService } from 'src/app/common-data.service';
import { RequestsService } from 'src/app/requests.service';
import { debounceTime } from 'rxjs/operators';
import { icon, latLng, marker,  Marker, tileLayer } from 'leaflet';
import { MapMarkerComponent } from '../map-marker/map-marker.component';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit {
  map;
  markers: any[] = [];
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    ],
    zoom: 13,
    maxZoom:15,
    minZoom:11,
    center: latLng(33.5102, 36.29128)
  };

  bCategories: Object[];
  cities: Object[];
  posts: Object[];
  menuPosts: Object[];

  cityID: string = "0";
  categoryID: string = "0";
  title;
  params: Object = {};

  constructor(private cds: CommonDataService, private requests: RequestsService, private resolver: ComponentFactoryResolver, private injector: Injector) { }
  onMapReady(map){
    this.map = map;
  } 
  addMarkers() {

    for (const entry of this.posts) {
      if (entry["locationPoint"] && entry["locationPoint"]!=null){
        const factory = this.resolver.resolveComponentFactory(MapMarkerComponent);
        const component = factory.create(this.injector);
        component.instance.data = entry;
        component.changeDetectorRef.detectChanges();
  
        let m = marker(new latLng(entry["locationPoint"]), {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'leaflet/marker-icon.png',
            shadowUrl: 'leaflet/marker-shadow.png'
          })
        });
  
        const popupContent = component.location.nativeElement;
        m.bindPopup(popupContent).openPopup();
        m.addTo(this.map);

        this.markers.push({
          data: entry,
          markerInstance: m,
          componentInstance: component
        });
      }
    }
  }
  ngDoCheck() {
    // since our components are dynamic, we need to manually iterate over them and trigger
    // change detection on them.
    this.markers.forEach(entry => {
      entry.componentInstance.changeDetectorRef.detectChanges();
    })
  }
  removeMarkers() {
    this.markers.forEach(marker=>{
      marker.markerInstance.removeFrom(this.map);
      marker.componentInstance.destroy();
    })
    this.markers.splice(0);
  }
  titleFilter() { 
    if (this.title.length == 0) {
      delete this.params['filter[where][nameUnique][like]'];
    } else {
      this.params['filter[where][nameUnique][like]'] = this.title;
    }
    this.requests.get('businesses', this.params)
      .pipe(debounceTime(300))
      .subscribe(res => {
        this.posts = <Object[]>res;
        this.menuPosts = this.posts.slice(0,20);
        this.removeMarkers();
        this.addMarkers();
      })
  }

  reFilter() {
    if (this.categoryID == "0" && this.cityID == "0") {
      delete this.params["filter[where][cityId]"];
      delete this.params["filter[where][categoryId]"];
      this.getPostsData(this.params);
    } else {
      if (this.categoryID != "0") {
        this.params['filter[where][categoryId]'] = this.categoryID;
      }
      if (this.cityID != "0") {
        this.params['filter[where][cityId]'] = this.cityID;
      }
      this.getPostsData(this.params);
    }
  }

  getPostsData(params) {
    this.requests.get('businesses', params).subscribe(res => {
      this.posts = <Object[]>res;
      this.menuPosts = this.posts.slice(0, 20);
      this.removeMarkers();
      this.addMarkers();
    })
  }

  ngOnInit() {
    this.cds.citiesPromise.then(res => this.cities = <Object[]>res);
    this.cds.bCategoryPromise.then(res => this.bCategories = <Object[]>res);
    this.getPostsData({});

    // {
    //   "filter[limit]": "20",
    //     "filter[skip]": "0"
    // }

  }
}
