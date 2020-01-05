import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Gallery, ImageItem, VideoItem } from '@ngx-gallery/core';
import { RequestsService } from 'src/app/requests.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  data: any = {};
  toggle1 = true;
  toggle2 = true;
  public _albums = [];

  constructor(private gallery: Gallery, private route: ActivatedRoute,
    private tr: TranslateService, private api: RequestsService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.data['id'] = params.id;

      this.api.get('marketProducts/' + this.data['id']).toPromise().then(res => {

        this.data['phone'] = res['owner']['phoneNumber'];
        this.data['price'] = res['price'];
        this.data['tags'] = res['tags'];

        var t = new Date(res['creationDate']);
        this.data['creationDate'] = t.toLocaleDateString();

        for (let i = 0; i < res['media'].length; i++) {
          const src = res['media'][i];
          const album = {
            src: src,
          };
          this._albums.push(new ImageItem(album));
        }

        const galleryRef = this.gallery.ref();
        galleryRef.load(this._albums);

        if (this.tr.currentLang == 'ar') {
          this.data['title'] = res['titleAr'];
          this.data['description'] = res['descriptionAr'];
          this.data['area'] = res['city']['nameAr'];
          this.data['subArea'] = res['location']['nameAr'];
          this.data['category'] = res['category']['titleAr'];
          this.data['subCategory'] = res['subCategory']['titleAr'];
        }
        else {
          this.data['title'] = res['titleEn'];
          this.data['description'] = res['descriptionEn'];
          this.data['area'] = res['city']['nameEn'];
          this.data['subArea'] = res['location']['nameEn'];
          this.data['category'] = res['category']['titleEn'];
          this.data['subCategory'] = res['subCategory']['titleEn'];
        }

      })
    })
  }

}
