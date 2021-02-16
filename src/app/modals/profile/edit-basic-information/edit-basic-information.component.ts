import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonDataService } from 'src/app/services/common-data.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
    selector: 'edit-basic-information',
    templateUrl: 'edit-basic-information.component.html',
    styleUrls: ['edit-basic-information.component.css']
})
export class EditBasicInformationComponent {
    dialogInfo: any;
    allCity: any = []
    errorMessage = ""
    @ViewChild('file', { static: false }) fileController: ElementRef

    constructor(public api: RequestsService, private cds: CommonDataService, public thisDialog: MatDialogRef<EditBasicInformationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.cds.citiesPromise.then(res => this.allCity = <Object[]>res);

        var cv = data['user']['CV']
        if (data['user']['CV'] != null) {
            this.dialogInfo = {
                "bio": cv.bio,
                "primaryIdentifier": cv.primaryIdentifier,
                "githubLink": cv.githubLink,
                "facebookLink": cv.facebookLink,
                "twitterLink": cv.twitterLink,
                "websiteLink": cv.websiteLink,
                "behanceLink": cv.behanceLink,
                "cityId": cv.cityId,
                'username': data['user'].username,
                'phoneNumber': data['user'].phoneNumber,
                "imageProfile": data['user'].imageProfile || 'http://via.placeholder.com/150x150'
            }
        }
    }

    save() {
        if (this.dialogInfo['cityId'] == null) {
            this.errorMessage = "city"
            return
        }
        this.thisDialog.close(this.dialogInfo)
    }


    editImage() {
        $('#imageFile').trigger('click')
    }
    imageChanged() {
        let images = new FormData();
        images.append('file', this.fileController.nativeElement.files[0]);
        this.api.post('attachments/images/upload', images).subscribe(res => {
            this.dialogInfo['imageProfile'] = res[0].url
        })

    }

}
