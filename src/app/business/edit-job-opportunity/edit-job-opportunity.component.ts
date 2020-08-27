import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../authentication/auth.service';
import { Component } from '@angular/core';
import { RequestsService } from 'src/app/requests.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'edit-job-opportunity',
    templateUrl: 'edit-job-opportunity.component.html',
    styleUrls: ['edit-job-opportunity.component.css']
})
export class EditJobOpportunityComponent {
    newObject = { "nameEn": "", "nameAr": "", "responsibilitiesAr": "", "responsibilitiesEn": "", "qualificationsAr": "", "qualificationsEn": "", "descriptionEn": "", "descriptionAr": "", "rangeSalary": "", "categoryId": -1, "subCategoryId": -1, "jobType": -1, "minimumEducationLevel": -1 }
    allCategory: any = []
    allSubcategory: any = []
    allbusiness: any = []
    isBusinessInPath = false
    inputFocus = false
    id;
    resultSearsh: any = []
    tags: any = []
    inputValue = ""
    viewLoader = false
    errorMessage = ""
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
    constructor(private api: RequestsService, private auth: AuthService, private translteService: TranslateService, private route: ActivatedRoute, private router: Router) {
        var self = this
        this.route.params.subscribe((params) => {
            self.id = params['id']
        })
        this.api.get('jobOpportunities/' + self.id).toPromise().then((data) => {
            // newObject = { "nameEn": "", "nameAr": "", "responsibilitiesAr": "", "responsibilitiesEn": "", "qualificationsAr": "", "qualificationsEn": "", "descriptionEn": "", "descriptionAr": "", "rangeSalary": "", "categoryId": -1, "subCategoryId": -1, "jobType": -1, "minimumEducationLevel": -1 }

            self.newObject = { "nameEn": data['nameEn'], "responsibilitiesAr": data['responsibilitiesAr'], "responsibilitiesEn": data['responsibilitiesEn'], "qualificationsEn": data['qualificationsEn'], "qualificationsAr": data['qualificationsAr'], "nameAr": data['nameAr'], "descriptionEn": data['descriptionEn'], "descriptionAr": data['descriptionAr'], "rangeSalary": data['rangeSalary'], "categoryId": data['categoryId'], "subCategoryId": data['subCategoryId'], "jobType": data['jobType'] ? data['jobType'] : -1, "minimumEducationLevel": data['minimumEducationLevel'] ? data['minimumEducationLevel'] : -1 }
            self.tags = data['tags']
            self.onCategoryChange();
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
        this.tags.splice(index, 1)
    }

    addNewTag() {
        var value = this.inputValue;
        this.inputValue = "";
        var self = this;
        if (value != "")
            self.api.post('tags/addTag', { "name": value }).toPromise().then((data) => {
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
        this.api.put('jobOpportunities/' + this.id + '/updateJobOpportunity', this.newObject).toPromise().then((data) => {
            self.router.navigate(["job/" + self.id]);

        })

    }
    checkForm() {
        if (this.newObject['nameAr'] == null || this.newObject['nameAr'] == "") {
            return 'nameAr'
        }
        else if (this.newObject['nameEn'] == null || this.newObject['nameEn'] == "") {
            return "nameEn"
        }
        else if (this.newObject['descriptionAr'] == null || this.newObject['descriptionAr'] == "") {
            return "descriptionAr"
        }
        else if (this.newObject['descriptionEn'] == null || this.newObject['descriptionEn'] == "") {
            return "descriptionEn"
        }
        else if (this.newObject['rangeSalary'] == null || this.newObject['rangeSalary'] == "") {
            return "rangeSalary"
        }
        else if (this.newObject['categoryId'] == -1) {
            return "category"
        }
        else if (this.newObject['subCategoryId'] == -1) {
            return "subCategory"
        }
        return true
    }

}
