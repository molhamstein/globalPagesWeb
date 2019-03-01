import { Component, OnInit, ComponentFactoryResolver, ComponentRef, Injector, DoCheck } from '@angular/core';
import { CommonDataService } from 'src/app/common-data.service';
import { RequestsService } from 'src/app/requests.service';
import { debounceTime } from 'rxjs/operators';
import { icon, latLng, marker, Marker, tileLayer } from 'leaflet';
import { MapMarkerComponent } from '../map-marker/map-marker.component';
import { TranslateService } from '@ngx-translate/core';
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
    maxZoom: 15,
    minZoom: 11,
    center: latLng(33.5102, 36.29128)
  };

  bCategories: Object[];
  cities: Object[];
  posts: Object[];
  menuPosts: Object[];

  skip: number = 0;
  city;
  category;
  title;
  params: Object = {};
  nextDisabled= true;
  prevDisabled= false;


  constructor(private ts: TranslateService, private cds: CommonDataService, private requests: RequestsService, private resolver: ComponentFactoryResolver, private injector: Injector) { }
  onMapReady(map) {
    this.map = map;
  }
  addMarkers() {

    for (const entry of this.posts) {
      if (entry["locationPoint"] && entry["locationPoint"] != null) {
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
    this.markers.forEach(marker => {
      marker.markerInstance.removeFrom(this.map);
      marker.componentInstance.destroy();
    })
    this.markers.splice(0);
  }
  // titleFilter() { 
  //   var Lang = 'nameEn';
  //   if (this.ts.currentLang == 'ar'){
  //     Lang = 'nameAr'
  //   }


  //   if (this.title== undefined ||  this.title.length == 0) {
  //     delete this.params['filter[where]['+Lang+'][like]'];
  //   } else {
  //     this.params['filter[where]['+Lang+'][like]'] = this.title;
  //   }
  //   this.requests.get('businesses', this.params)
  //     .pipe(debounceTime(300))
  //     .subscribe(res => {
  //       this.posts = <Object[]>res;
  //       this.menuPosts = this.posts;//.slice(0,20);
  //       // this.removeMarkers();
  //       // this.addMarkers();
  //     })
  // }
  subCategory={}
  location=""
  reFilter() {
    var Lang = 'nameEn';
    if (this.ts.currentLang == 'ar') {
      Lang = 'nameAr'
    }


    if (this.title == undefined || this.title.length == 0) {
      delete this.params['filter[where][' + Lang + '][like]'];
    } else {
      this.params['filter[where][' + Lang + '][like]'] = this.title;
    }

    if (this.category == "0" && this.city == "0") {
      delete this.params["filter[where][cityId]"];
      delete this.params["filter[where][categoryId]"];
      this.getPostsData(this.params);
    } else {
      if (this.category != "0") {
        this.params['filter[where][categoryId]'] = this.category['id'];
      }
      if (this.city != "0") {
        this.params['filter[where][cityId]'] = this.city['id'];
      }
      this.getPostsData(this.params);
    }
  }

  getPostsData(params) {
    params['filter[where][status]'] = "activated";
    params['filter[limit]'] = "20";

    params['filter[skip]'] = (20 * this.skip).toString();
    this.requests.get('businesses', params).subscribe(res => {
      this.posts = <Object[]>res;
      // console.warn(res);
      if (this.posts.length>0){
        this.menuPosts = this.posts;//.slice(0, 20);
      }else{
        this.prevDisabled=true;
      }
      // this.removeMarkers();
      // this.addMarkers();
    })
  }
  prev() {
    this.nextDisabled = false;
    this.skip += 1;
    this.reFilter()
  }
  next() {
    if (this.skip>0){
      if(this.skip<=1){
        this.nextDisabled=true;
      }
      this.skip -= 1;
      this.reFilter();
      this.prevDisabled=false;
    }
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
