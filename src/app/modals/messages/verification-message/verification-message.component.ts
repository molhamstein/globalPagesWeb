import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
    selector: 'verification-message',
    templateUrl: 'verification-message.component.html',
    styleUrls: ['verification-message.component.css']
})
export class VerificationMessageComponent {
    message = ""
    constructor(private api: RequestsService, public thisDialog: MatDialogRef<VerificationMessageComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.message = data['message']
    }
    close() {
        this.thisDialog.close()
    }
    yes() {
        this.thisDialog.close(true)
    }

}
