import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-job-card',
    templateUrl: 'job-card.component.html',
    styleUrls: ['job-card.component.scss']
})
export class JobCardComponent {
    @Input() post: any;
    data: any = {};
    constructor(private tr: TranslateService) { }

    ngOnInit() {
        // console.warn(this.post)
        // delete following condition when deployment
        if (this.post.hasOwnProperty('business') && this.post['business'].hasOwnProperty('logo') && this.post['business']['logo'] != "") {
            this.data['img'] = this.post['business']['logo'];
        }
        else {
            this.data['img'] = '../../../assets/images/page/business-01.png'
        }

        if (this.post.hasOwnProperty('description')) {
            this.data['description'] = this.post['description'];
        }

        if (this.post.hasOwnProperty('id')) {
            this.data['id'] = this.post['id'];
        }
        if (this.post.hasOwnProperty('business') && this.post['business'].hasOwnProperty('nameUnique')) {
            this.data['nameUnique'] = this.post['business']['nameUnique'];
        }

        var previousweek = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).getTime()

        if (new Date(this.post['creationDate']).getTime() > previousweek) {
            this.data['isNew'] = true
        }
        this.data['since'] = this.calculatDateAdv(this.post['creationDate'])
        if (this.tr.currentLang == 'ar') {
            if (this.post.hasOwnProperty('nameAr')) {
                this.data['name'] = this.post['nameAr'];
            }
            if (this.post.hasOwnProperty('business') && this.post['business'].hasOwnProperty('city') && this.post['business']['city'].hasOwnProperty('nameAr')) {
                this.data['address'] = this.post['business']['city']['nameAr'];
            }
            if (this.post.hasOwnProperty('business') && this.post['business'].hasOwnProperty('location') && this.post['business']['location'].hasOwnProperty('nameAr')) {
                this.data['address'] += " , " + this.post['business']['location']['nameAr'];
            }
            if (this.post.hasOwnProperty('category') && this.post['category'].hasOwnProperty('titleAr')) {
                this.data['category'] = this.post['category']['titleAr'];
            }
            if (this.post.hasOwnProperty('subCategory') && this.post['subCategory'].hasOwnProperty('titleAr')) {
                this.data['subCategory'] = this.post['subCategory']['titleAr']
            }
        } else {
            if (this.post.hasOwnProperty('nameEn')) {
                this.data['name'] = this.post['nameEn'];
            }

            if (this.post.hasOwnProperty('business') && this.post['business'].hasOwnProperty('city') && this.post['business']['city'].hasOwnProperty('nameEn')) {
                this.data['address'] = this.post['business']['city']['nameEn'];
            }
            if (this.post.hasOwnProperty('business') && this.post['business'].hasOwnProperty('location') && this.post['business']['location'].hasOwnProperty('nameEn')) {
                this.data['address'] += " , " + this.post['business']['location']['nameEn'];
            }

            if (this.post.hasOwnProperty('category') && this.post['category'].hasOwnProperty('titleEn')) {
                this.data['category'] = this.post['category']['titleEn'];
            }
            if (this.post.hasOwnProperty('subCategory') && this.post['subCategory'].hasOwnProperty('titleEn')) {
                this.data['subCategory'] = this.post['subCategory']['titleEn']
            }
        }
    }

    calculatDateAdv(date) {
        var time = this.diff_minutes(new Date(), new Date(date))
        var pipe = new DatePipe('en-US'); // Use your own locale

        if (time < 1) {
            if (this.tr.currentLang == 'ar')
                return "الأن"
            else
                return "now"
        }
        else if (time < 60) {
            if (this.tr.currentLang == 'ar')
                return time + " دقيقة ";
            else
                return time + " min ";

        }
        else if (this.diff_hours(new Date(), new Date(date)) < 24) {
            if (this.tr.currentLang == 'ar')
                return this.diff_hours(new Date(), new Date(date)) + " ساعة ";
            else
                return this.diff_hours(new Date(), new Date(date)) + " hours ";
        }
        else if (this.diff_days(new Date(), new Date(date)) < 7) {
            if (this.tr.currentLang == 'ar')
                return this.diff_days(new Date(), new Date(date)) + " يوم ";
            else
                return this.diff_days(new Date(), new Date(date)) + " days ";
        }
        else
            return pipe.transform(date, 'dd-MM-yyyy');
    }


    private diff_minutes(dt2, dt1) {

        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60);
        return Math.abs(Math.round(diff));

    }

    private diff_hours(dt2, dt1) {

        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60);
        return Math.abs(Math.round(diff));

    }

    private diff_days(dt2, dt1) {

        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60 * 24);
        return Math.abs(Math.round(diff));

    }

    private diff_week(dt2, dt1) {

        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60 * 24 * 7);
        return Math.abs(Math.round(diff));

    }

    private diff_month(dt2, dt1) {

        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60 * 24 * 30);
        return Math.abs(Math.round(diff));

    }

}
