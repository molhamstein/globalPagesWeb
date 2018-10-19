import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestsService } from '../../requests.service';
@Component({
  selector: 'app-featured-ads',
  templateUrl: './featured-ads.component.html',
  styleUrls: ['./featured-ads.component.css']
})
export class FeaturedAdsComponent implements OnInit {
  owlOptions = {
    autoplay: true,
    dots: false,
    nav: true,
    margin: 27,
    loop: true,
    items: 4,
    responsive: {
      0: {
        items: 1
      },
      479: {
        items: 2
      },
      768: {
        items: 3
      },
      991: {
        items: 4
      },
      1200: {
        items: 4
      }
    }
  };

  constructor(private rs: RequestsService) { }
  public data: Object[];
  getFeaturedAds()  {
    return this.rs.get('posts?filter[where][isFeatured]=true');
  }

  ngOnInit() {

    this.getFeaturedAds().subscribe(res => {
      this.data = <Object[]>res;
    }
    )

  }
}
