import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDataService } from 'src/app/services/common-data.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
    selector: 'jobs',
    templateUrl: 'jobs.component.html',
    styleUrls: ['jobs.component.scss']
})
export class JobsComponent {

    categories: any[];
    cities: any[];
    countries: any[];
    jobs: any[];

    country: any;
    countryId = "";
    city: any;
    cityId = "";
    location = "";

    category;
    categoryId = "";
    subCategory = "";

    title = "";
    params: Object = {};
    skip: number = 0;
    nextDisabled = true;
    prevDisabled = false;

    constructor(
        private cds: CommonDataService,
        private requests: RequestsService,
        private route: ActivatedRoute,
        private router: Router) { }


    ngOnInit() {
        const filter = this.getQueryParams();
        this.cds.countriesPromise.then(res => this.countries = <Object[]>res);
        this.cds.jobCategories.then(res => this.categories = <Object[]>res);
        this.getPostsData(filter);
    }

    addQueryParams(param: object) {
        this.router.navigate([], {
            queryParams: { ...param },
        });
    }

    getQueryParams() {
        let params = this.route.snapshot.queryParams;
        let filter = "?status=activated&";
        if (params.keyword && params.keyword.trim().length != 0) {
            filter += "keyword=" + params.keyword + "&"
        }
        if (params.countryId) {
            filter += "countryId=" + params.countryId + "&"
        }
        if (params.cityId) {
            filter += "cityId=" + params.cityId + "&"
        }
        if (params.location) {
            filter += "locationId=" + params.location + "&";
        }
        if (params.categoryId) {
            filter += "categoryId=" + params.categoryId + "&"
        }
        if (params.subCategory) {
            filter += "subCategoryId=" + params.subCategory + "&"
        }
        return filter;
    }

    reFilter() {

        this.params = "?status=activated&";
        this.addQueryParams({
            keyword: this.title,
            countryId: this.countryId,
            cityId: this.cityId,
            categoryId: this.categoryId,
            location: this.location,
            subCategory: this.subCategory
        });

        if (this.title != "" && this.title.trim().length != 0) {
            this.params += "keyword=" + this.title + "&"
        }
        if (this.countryId != "") {
            this.params += "countryId=" + this.countryId + "&"
        }
        if (this.cityId != "") {
            this.params += "cityId=" + this.cityId + "&"
        }
        if (this.location != "") {
            this.params += "locationId=" + this.location + "&";
        }
        if (this.categoryId != "") {
            this.params += "categoryId=" + this.categoryId + "&"
        }
        if (this.subCategory != "") {
            this.params += "subCategoryId=" + this.subCategory + "&"
        }
        this.getPostsData(this.params);
    }

    getPostsData(params) {

        params += "&limit=20";
        params += "&offset=" + (20 * this.skip).toString();

        this.requests.get('jobOpportunities/searchJob' + params).subscribe(res => {
            this.jobs = <Object[]>res;
            if (this.jobs.length == 0) {
                this.prevDisabled = true;
                if (this.skip == 0) {
                    this.nextDisabled = true;
                }
            }
        });
    }

    setCountryId(c) {
        if (c != undefined) {
            this.countryId = c['id'];
            this.cds.getCities(this.countryId).then(res => this.cities = <Object[]>res);
        }
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
