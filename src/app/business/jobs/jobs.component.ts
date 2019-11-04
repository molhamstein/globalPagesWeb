import { RequestsService } from 'src/app/requests.service';
import { CommonDataService } from 'src/app/common-data.service';
import { Component } from '@angular/core';

@Component({
    selector: 'jobs',
    templateUrl: 'jobs.component.html',
    styleUrls: ['jobs.component.scss']
})
export class JobsComponent {
    constructor(private cds: CommonDataService, private requests: RequestsService) { }
    bCategories: Object[];
    cities: Object[];
    posts
    menuPosts

    city;
    category;
    initialValue;
    skip: number = 0;
    cityId = "";
    categoryId = "";
    subCategory = "";
    title = "";
    params: Object = {};
    nextDisabled = true;
    prevDisabled = false;

    ngOnInit() {
        this.cds.citiesPromise.then(res => this.cities = <Object[]>res);
        this.cds.jCategoryPromise.then(res => this.bCategories = <Object[]>res);
        this.getPostsData("?status=activated&");
    }

    reFilter() {

        this.params = "?status=activated&"

        if (this.title != "" && this.title.trim().length != 0) {
            this.params += "keyword=" + this.title + "&"
            // this.params['filter[where][and]'].push({ "nameEn": { "like": this.title, "options": "i" } })
        }

        if (this.cityId != "") {
            this.params += "cityId=" + this.cityId + "&"
        }
        if (this.categoryId != "") {
            this.params += "categoryId=" + this.categoryId + "&"

        }
        if (this.subCategory != "") {
            this.params += "subCategoryId=" + this.subCategory + "&"
        }
        console.log(this.params)
        this.getPostsData(this.params);
    }

    setCityId(c) {
        if (c != undefined) {
            this.cityId = c['id'];
        }
    }
    setCategoryId(c) {
        if (c != undefined) {
            this.categoryId = c['id'];
        }
    }

    getPostsData(params) {
        // params['filter[where][status]'] = "activated";
        // params['filter[limit]'] = "20";

        // params['filter[skip]'] = (20 * this.skip).toString();
        params += "&limit=20"
        params += "&offset=" + (20 * this.skip).toString();

        this.requests.get('jobOpportunities/searchJob' + params).subscribe(res => {
            this.posts = <Object[]>res;
            this.menuPosts = this.posts;//.slice(0, 20);
            if (this.posts.length == 0) {
                this.prevDisabled = true;
                if (this.skip == 0) {
                    this.nextDisabled = true;
                }
            }
        })
    }


    prev() {
        this.nextDisabled = false;
        this.skip += 1;
        this.reFilter()
    }
    next() {
        if (this.skip > 0) {
            if (this.skip <= 1) {
                this.nextDisabled = true;
            }
            this.skip -= 1;
            this.reFilter();
            this.prevDisabled = false;
        }
    }
}
