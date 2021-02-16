import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VerificationMessageComponent } from 'src/app/modals/messages/verification-message/verification-message.component';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
    selector: 'edit-skill',
    templateUrl: 'edit-skill.component.html',
    styleUrls: ['edit-skill.component.css']
})
export class EditSkillComponent {
    inputFocus = false
    resultSearsh: any = []
    tags: any = []
    inputValue = ""
    viewLoader = false
    constructor(private api: RequestsService, private dialog: MatDialog, public thisDialog: MatDialogRef<EditSkillComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.tags = data['tags'].map(x => Object.assign({}, x));
    }
    typeing(event) {
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
    close() {
        this.thisDialog.close()
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

    save() {
        var ids = []
        this.tags.forEach(element => {
            ids.push(element.id)
        });
        this.thisDialog.close(ids);
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
            self.api.post('tags/addTag', { "name": value }).toPromise().then((data) => {
                self.addTag(data);
            })
    }

    foucasOut() {
        var self = this;
        setTimeout(() => {
            self.inputFocus = false;
        }, 200);
    }
}
