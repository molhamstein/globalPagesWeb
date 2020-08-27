import { VerificationMessageComponent } from './../../verification-message/verification-message.component';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

@Component({
    selector: 'edit-info',
    templateUrl: 'edit-info.component.html',
    styleUrls: ['edit-info.component.css']
})
export class EditInfoComponent {
    type = ""
    object
    yearArray = []
    newObject: any;
    monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    errorMessage = ''
    constructor(private dialog: MatDialog, public thisDialog: MatDialogRef<EditInfoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.type = data['type']
        this.object = data['object']
        for (let index = 1970; index < 2030; index++) {
            this.yearArray.push(index)
        }

        if (this.type == 'education') {
            this.newObject = { "isPresent": false, "title": "", "educationalEntity": "", "description": "", "monthFrom": -1, "yearFrom": -1, "monthTo": -1, "yearTo": -1 }
            if (this.object != null) {
                this.newObject = { "isPresent": false, "title": this.object.title, "educationalEntity": this.object.educationalEntity, "description": this.object.description, "monthFrom": new Date(this.object.from).getMonth(), "yearFrom": new Date(this.object.from).getFullYear(), "monthTo": new Date(this.object.to).getMonth(), "yearTo": new Date(this.object.to).getFullYear() }
            }
        } else {
            this.newObject = { "isPresent": false, "title": "", "companyName": "", "description": "", "monthFrom": -1, "yearFrom": -1, "monthTo": -1, "yearTo": -1 }
            if (this.object != null) {
                this.newObject = { "isPresent": this.object.isPresent, "title": this.object.title, "companyName": this.object.companyName, "description": this.object.description, "monthFrom": new Date(this.object.from).getMonth(), "yearFrom": new Date(this.object.from).getFullYear(), "monthTo": new Date(this.object.to).getMonth(), "yearTo": new Date(this.object.to).getFullYear() }
            }
        }
    }


    save() {
        this.errorMessage = ""
        let value = this.checkForm()
        if (value != true) {
            this.errorMessage = value;
            return
        }
        this.newObject['from'] = new Date(this.newObject['yearFrom'] + "-" + (parseInt(this.newObject['monthFrom']) + 1) + "- 1")
        this.newObject['to'] = new Date(this.newObject['yearTo'] + "-" + (parseInt(this.newObject['monthTo'] + 1)) + "- 1")
        if (this.object == null) {
            this.thisDialog.close({ "action": "add", "type": this.type, "object": this.newObject })
        } else if (this.object != null) {
            this.thisDialog.close({ "action": "edit", "type": this.type, "object": this.newObject })
        }
    }

    delete() {
        let self = this;
        let dialogRef = this.dialog.open(VerificationMessageComponent, {
            //   width: '70%',
            panelClass: 'communictioDialogStyle',
            data: { "message": "deleteInfo" }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                self.thisDialog.close({ "action": "delete", "type": this.type })
            }
        })
    }


    checkForm() {
        if (this.type == 'education') {
            if (this.newObject['title'] == null || this.newObject['title'] == "") {
                return 'title'
            }
            else if (this.newObject['educationalEntity'] == null || this.newObject['educationalEntity'] == "") {
                return "educationalEntity"
            }
            else if (this.newObject['monthFrom'] == -1 || this.newObject['yearFrom'] == -1) {
                return "fullfrom"
            }
            else if (this.newObject['monthTo'] == -1 || this.newObject['yearTo'] == -1) {
                return "fullto"
            }
            return true
        } else {
            if (this.newObject['title'] == null || this.newObject['title'] == "") {
                return "title"
            }
            else if (this.newObject['companyName'] == null || this.newObject['companyName'] == "") {
                return "companyName"
            }
            else if (this.newObject['monthFrom'] == null || this.newObject['monthFrom'] == -1 || this.newObject['yearFrom'] == -1) {
                return "fullfrom"
            }
            else if (this.newObject['isPresent'] == false && (this.newObject['monthTo'] == -1 || this.newObject['yearTo'] == -1)) {
                return "fullto"
            }
            return true
        }
    }
    close() {
        this.thisDialog.close()
    }

}
