import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestsService } from 'src/app/requests.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { VerificationMessageComponent } from 'src/app/verification-message/verification-message.component';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/authentication/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {


  id: string;
  product: any = {};

  categories: any;
  subCategories: any;
  allBusiness: any;
  cities: any;
  locations: any;
  files;

  images: string[] = [];

  tags: any = [];
  inputValue: string = "";
  inputFocus: boolean = false;
  viewLoader: boolean = false;
  resultSearsh: any = [];

  @ViewChild('form', { static: false }) form;

  constructor(private api: RequestsService, private auth: AuthService, private spinner: NgxSpinnerService,
    private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {

    let params = new HttpParams();
    params = params.set('filter', JSON.stringify({
      "where": { "parentCategoryId": { "exists": false } },
      "include": "subCategories"
    }));

    this.api.get('productCategories', params).toPromise().then(data => {
      this.categories = data;
    });

    this.api.get('cities').toPromise().then(data => {
      this.cities = data;
    });

    this.auth.userData.subscribe((data) => {
      let filter = { "where": { "ownerId": data['id'] } };
      this.api.get('businesses?filter=' + JSON.stringify(filter)).toPromise().then((res) => {
        this.allBusiness = res;
      });
    });

    this.route.params.subscribe(params => {
      this.id = params.id;
      this.api.get('marketProducts/' + this.id).subscribe(res => {
        this.product = res;
        this.images = this.product.media;
        this.tags = this.product.tags;
        this.onCategoryChange();
        this.cityChanged();
      });
    });

  }

  submit(data) {


    this.spinner.show();

    const user = JSON.parse(localStorage.getItem(environment.userDetails));
    data['ownerId'] = user['userId'];

    data['tags'] = [];
    for (let tag of this.tags) {
      data['tags'].push(tag.id);
    }

    if (this.files && this.files.length > 0) {

      let formData: FormData = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        formData.append('file', this.files[i].file);
      }

      this.api.post('attachments/images/upload', formData).subscribe((res: any[]) => {

        for (let i = 0; i < res.length; i++) {
          this.images.push(res[i].url);
        }

        data['media'] = this.images;


        this.api.put('marketProducts/' + this.id + '/updateProduct', data).subscribe(data => {
          this.spinner.hide();
          this.router.navigate(['products']);
        }, err => {
          this.spinner.hide();
        })
      });
    } else {

      data['media'] = this.images;


      this.api.put('marketProducts/' + this.id + '/updateProduct', data).subscribe(data => {
        this.spinner.hide();
        this.router.navigate(['products']);
      }, err => {
        this.spinner.hide();
      });
    }

  }

  onCategoryChange() {
    if (this.categories != null) {
      let cat = this.categories.find((v) => { if (v['id'] == this.product['categoryId']) return true })
      this.subCategories = cat['subCategories'];
    }
  }

  cityChanged() {

    let params = new HttpParams();
    params = params.set('filter', JSON.stringify({
      where: {
        cityId: this.product.cityId,
      }
    }));

    this.locations = [];

    this.api.get('locations', params).toPromise().then(data => {
      this.locations = data
    });

  }

  typeing(event) {

    let value = event.target.value;
    let self = this;

    setTimeout(() => {
      if (self.inputValue == value) {
        let filter = { "where": { "name": { "like": value, "options": "i" } } }
        self.viewLoader = true;
        self.api.get('tags' + "?filter=" + JSON.stringify(filter)).toPromise().then((data) => {
          self.viewLoader = false;
          self.resultSearsh = data;
        })
      }
    }, 1000);

  }

  addTag(tag) {
    this.tags.forEach(element => {
      if (element.id == tag.id) {
        // already exist   
        return;
      }
    });
    this.tags.push(tag);
    this.inputValue = "";
  }

  removeTag(index) {
    let self = this;
    let dialogRef = this.dialog.open(VerificationMessageComponent, {
      panelClass: 'communictioDialogStyle',
      data: { "message": "deleteSkill" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        self.tags.splice(index, 1)
      }
    })
  }

  addNewTag() {
    let value = this.inputValue;
    this.inputValue = "";
    let self = this;
    if (value != "")
      self.api.post('tags', { "name": value }).toPromise().then((data) => {
        self.addTag(data);
      })
  }

  foucasOut() {
    let self = this;
    setTimeout(() => {
      self.inputFocus = true;
    }, 200);
  }

}
