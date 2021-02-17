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
    constructor(private cds: CommonDataService, private requests: RequestsService,
        private route: ActivatedRoute, private router: Router) { }

    bCategories: Object[];
    cities: Object[];
    posts;
    menuPosts;
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
        const filter = this.getQueryParams();
        this.cds.citiesPromise.then(res => this.cities = <Object[]>res);
        this.cds.jobCategories.then(res => this.bCategories = <Object[]>res);
        this.getPostsData(filter);
    }

    getQueryParams() {
        let params = this.route.snapshot.queryParams;
        let filter = "?status=activated&";
        if (params.keyword && params.keyword.trim().length != 0) {
            filter += "keyword=" + params.keyword + "&"
        }
        if (params.cityId) {
            filter += "cityId=" + params.cityId + "&"
        }
        if (params.categoryId) {
            filter += "categoryId=" + params.categoryId + "&"
        }
        if (params.subCategory) {
            filter += "subCategoryId=" + params.subCategory + "&"
        }
        return filter;
    }

    addQueryParams(param: object) {
        this.router.navigate([], {
            queryParams: { ...param },
        });
    }

    reFilter() {

        this.params = "?status=activated&";
        this.addQueryParams({
            keyword: this.title,
            cityId: this.cityId,
            categoryId: this.categoryId,
            subCategory: this.subCategory
        });

        if (this.title != "" && this.title.trim().length != 0) {
            this.params += "keyword=" + this.title + "&"
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

        params += "&limit=20"
        params += "&offset=" + (20 * this.skip).toString();

        this.requests.get('jobOpportunities/searchJob' + params).subscribe(res => {
            this.posts = <Object[]>res;
            this.menuPosts = this.posts;
            if (this.posts.length == 0) {
                this.prevDisabled = true;
                if (this.skip == 0) {
                    this.nextDisabled = true;
                }
            }
        });
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
