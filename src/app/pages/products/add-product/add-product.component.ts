import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { VerificationMessageComponent } from 'src/app/modals/messages/verification-message/verification-message.component';
import { AuthService } from 'src/app/services/auth.service';
import { RequestsService } from 'src/app/services/requests.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private api: RequestsService, private translteService: TranslateService, private router: Router,
    private spinner: NgxSpinnerService, private auth: AuthService, private dialog: MatDialog) { }

  categories: any;
  subCategories: any;
  selectedCategory: any;
  selectedBusiness: any;
  allBusiness: any;
  lang: string;
  cities: any;
  selectedCity: any;
  selectedCountry: any;

  locations: any;
  locationId: string;
  subCategoryId: string;
  files;
  countries: any[];

  tags: any = [];
  inputValue: string = "";
  inputFocus: boolean = false;
  viewLoader: boolean = false;
  resultSearsh: any = [];

  @ViewChild('form', { static: false }) form;

  ngOnInit() {
    this.lang = this.translteService.currentLang

    let params = new HttpParams();
    params = params.set('filter', JSON.stringify({
      "where": { "parentCategoryId": { "exists": false } },
      "include": "subCategories"
    }));
    this.translteService.onLangChange.subscribe(() => {
      this.lang = this.translteService.currentLang;
    })
    this.api.get('productCategories', params).toPromise().then(data => {
      this.categories = data;
    })
    this.api.get('countries').toPromise().then((data: any) => {
      this.countries = data;
    })

    this.auth.userData.subscribe((data) => {
      let filter = { "where": { "ownerId": data['id'] } }
      this.api.get('businesses?filter=' + JSON.stringify(filter)).toPromise().then((res) => {
        this.allBusiness = res;
      })
    })
  }





  submit(data) {


    this.spinner.show();


    data['categoryId'] = this.categories[this.selectedCategory]['id']
    const user = JSON.parse(localStorage.getItem(environment.userDetails));
    data['ownerId'] = user['userId'];

    data['media'] = [];
    data['tags'] = [];
    data['status'] = "pending";


    for (let tag of this.tags) {
      data['tags'].push(tag.id);
    }

    if (this.selectedBusiness != null) data['businessId'] = this.selectedBusiness;

    let images: FormData = new FormData();

    if (this.files && this.files.length > 0) {

      for (let i = 0; i < this.files.length; i++) {
        images.append('file', this.files[i].file);
      }

      this.api.post('attachments/images/upload', images).subscribe((res: any[]) => {

        for (let i = 0; i < res.length; i++) {
          data['media'].push(res[i].url);
        }

        this.api.post('marketProducts/addProduct', data).subscribe(data => {
          this.spinner.hide();
          this.router.navigate(['products']);
        })
      });
    }

    else {
      this.api.post('marketProducts/addProduct', data).subscribe(data => {
        this.spinner.hide();
        this.router.navigate(['products']);
      })
    }




  }





  onCategoryChange() {
    this.subCategoryId = null;
    this.subCategories = this.categories[this.selectedCategory]['subCategories'];
  }

  countryChanged() {


    let p = new HttpParams();
    p = p.set('filter', JSON.stringify({
      where: { countryId: this.selectedCountry }
    }));

    this.api.get('cities', p).toPromise().then(data => {
      this.cities = data
    });

  }

  cityChanged() {

    this.locationId = null;
    let params = new HttpParams();
    params = params.set('filter', JSON.stringify({
      where: {
        cityId: this.selectedCity
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
    let isFind = false;
    this.tags.forEach(element => {
      if (element.id == tag.id) {
        isFind = true;
        return;
      }
    });
    if (isFind == false)
      this.tags.push(tag);
    this.inputValue = "";
  }

  removeTag(index) {
    let self = this;
    let dialogRef = this.dialog.open(VerificationMessageComponent, {
      //   width: '70%',
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
