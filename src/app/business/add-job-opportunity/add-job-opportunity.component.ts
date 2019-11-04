import { MatDialog } from '@angular/material';
import { VerificationMessageComponent } from './../../verification-message/verification-message.component';
import { AuthService } from './../../authentication/auth.service';
import { Observable, forkJoin, of } from 'rxjs';
import { environment } from './../../../environments/environment.prod';
import { HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { RequestsService } from 'src/app/requests.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { del } from 'selenium-webdriver/http';

@Component({
    selector: 'add-job-opportunity',
    templateUrl: 'add-job-opportunity.component.html',
    styleUrls: ['add-job-opportunity.component.css']
})
export class AddJobOpportunityComponent {
    newObject = { "nameEn": "", "nameAr": "", "responsibilitiesAr": "", "responsibilitiesEn": "", "qualificationsAr": "", "qualificationsEn": "", "descriptionEn": "", "descriptionAr": "", "rangeSalary": "", "categoryId": -1, "subCategoryId": -1, "jobType": null, "minimumEducationLevel": null }
    jobTypeArray = [
        { "title": "partTime", "value": "partTime" },
        { "title": "fullTime", "value": "fullTime" },
        { "title": "projectBased", "value": "projectBased" },
        { "title": "volunteer", "value": "volunteer" },
        { "title": "internship", "value": "internship" }
    ]

    minimumEducationLevelArray = [
        { "title": "highSchoolDegree", "value": "highSchoolDegree" },
        { "title": "associateDegree", "value": "associateDegree" },
        { "title": "universityDegree", "value": "universityDegree" },
        { "title": "masterDegree", "value": "masterDegree" },
        { "title": "doctoralDegree", "value": "doctoralDegree" },
    ]
    allCategory: any = []
    allSubcategory: any = []
    allbusiness: any = []
    isBusinessInPath = false
    businessId = -1;
    inputFocus = false
    resultSearsh: any = []
    tags: any = []
    inputValue = ""
    viewLoader = false
    errorMessage = ""
    constructor(private api: RequestsService, private dialog: MatDialog, private auth: AuthService, private translteService: TranslateService, private route: ActivatedRoute, private router: Router) {
        var self = this
        this.route.params.subscribe((params) => {
            if (params['id']) {
                self.isBusinessInPath = true;
                self.businessId = params['id']
            } else {
                this.auth.userData.subscribe((data) => {
                    console.log(data);
                    var filter = { "where": { "ownerId": data['id'] } }
                    this.api.get('businesses?filter=' + JSON.stringify(filter)).toPromise().then((data) => {
                        this.allbusiness = data
                    })
                })
            }
        })
        var filter = {
            "where": { "parentCategoryId": { "exists": false } },
            "include": "subCategories"
        }
        this.api.get('jobOpportunityCategories?filter=' + JSON.stringify(filter)).toPromise().then((data) => {
            self.allCategory = data;
        })

    }

    onCategoryChange() {
        var self = this
        var filter = {
            "where": { "parentCategoryId": this.newObject.categoryId },
        }
        this.api.get('jobOpportunityCategories?filter=' + JSON.stringify(filter)).toPromise().then((data) => {
            self.allSubcategory = data;
        })
    }

    typeing(event) {
        console.log(event);
        var value = event.target.value
        var self = this
        setTimeout(() => {
            if (self.inputValue == value) {
                var filter = { "where": { "name": { "like": value, "options": "i" } } }
                self.viewLoader = true;
                self.api.get('tags' + "?filter=" + JSON.stringify(filter)).toPromise().then((data) => {
                    self.viewLoader = false;
                    self.resultSearsh = data;
                })

            }
        }, 1000);
    }

    addTag(tag) {
        var isFind = false;
        this.tags.forEach(element => {
            if (element.id == tag.id) {
                isFind = true;
                return
            }
        });
        if (isFind == false)
            this.tags.push(tag)
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
        var value = this.inputValue;
        this.inputValue = "";
        var self = this;
        if (value != "")
            self.api.post('tags', { "name": value }).toPromise().then((data) => {
                self.addTag(data);
            })
    }

    foucasOut() {
        var self = this;
        setTimeout(() => {
            self.inputFocus = true;
        }, 200);
    }

    save() {
        this.errorMessage = ""
        var self = this;
        let value = this.checkForm()
        if (value != true) {
            this.errorMessage = value;
            window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
            return
        }
        this.newObject['tags'] = [];
        this.tags.forEach(element => {
            this.newObject['tags'].push(element.id)
        });
        if (this.newObject['minimumEducationLevel'] == null)
            delete this.newObject['minimumEducationLevel']
        if (this.newObject['jobType'] == null)
            delete this.newObject['jobType']
        this.api.post('businesses/' + this.businessId + '/addJobOpportunity', this.newObject).toPromise().then((data) => {
            // goToLogin() {
            self.router.navigate(["job/" + data['id']]);
            // }
        })

    }
    checkForm() {

        if (this.businessId == null || this.businessId == -1) {
            return 'business'
        }
        if ((this.newObject['nameAr'] == null || this.newObject['nameAr'] == "") && (this.newObject['nameAr'] == null || this.newObject['nameAr'] == "")) {
            return 'name'
        }
        // else if (this.newObject['descriptionAr'] == null || this.newObject['descriptionAr'] == "") {
        //     return "descriptionAr"
        // }
        // else if (this.newObject['descriptionEn'] == null || this.newObject['descriptionEn'] == "") {
        //     return "descriptionEn"
        // }
        // else if (this.newObject['rangeSalary'] == null || this.newObject['rangeSalary'] == "") {
        //     return "rangeSalary"
        // }
        else if (this.newObject['categoryId'] == -1) {
            return "category"
        }
        else if (this.newObject['subCategoryId'] == -1) {
            return "subCategory"
        }
        return true
    }
}
