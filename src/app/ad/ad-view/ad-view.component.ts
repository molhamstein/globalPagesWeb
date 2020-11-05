import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Gallery, ImageItem, VideoItem } from '@ngx-gallery/core';


@Component({
  selector: 'app-ad-view',
  templateUrl: './ad-view.component.html',
  styleUrls: ['./ad-view.component.css']
})
export class AdViewComponent implements OnInit {
  data: any = {};
  toggle1 = true;
  toggle2 = true;
  public _albums = [];

  constructor(private gallery: Gallery, private route: ActivatedRoute, private tr: TranslateService) { }



  ngOnInit() {
    this.route.data.subscribe(({ adData }) => {
      // console.warn (adData);
      this.data['id'] = adData['id'];
      this.data['phone'] = adData['owner']['phoneNumber'];
      this.data['title'] = adData['title'];
      this.data['description'] = adData['description'];
      var t = new Date(adData['creationDate']);
      this.data['creationDate'] = t.toLocaleDateString();
      this.data['viewsCount'] = adData['viewsCount'];
      // this.data['images']= adData['media'];
      for (let i = 0; i < adData['media'].length; i++) {
        const src = adData['media'][i]['url'];
        const caption = 'Image' + adData['media'][i]['id'];
        const thumb = adData['media'][i]['thumbnail'];
        const album = {
          src: src,
          title: caption,
          thumb: thumb
        };
        if (adData['media'][i]['type'] == 'image')
          this._albums.push(new ImageItem(album));
        else
          this._albums.push(new VideoItem(album));

        console.log(this._albums);
        // this._albums.push(album);
      }
      const galleryRef = this.gallery.ref();
      galleryRef.load(this._albums)
      if (this.tr.currentLang == 'ar') {
        this.data['area'] = adData['city']['nameAr'];
        this.data['subArea'] = adData['location']['nameAr'];
        this.data['category'] = adData['category']['titleAr'];
        this.data['subCategory'] = adData['subCategory']['titleAr'];
      } else {
        this.data['area'] = adData['city']['nameEn'];
        this.data['subArea'] = adData['location']['nameEn'];
        this.data['category'] = adData['category']['titleEn'];
        this.data['subCategory'] = adData['subCategory']['titleEn'];

      }
    })
  }

}
