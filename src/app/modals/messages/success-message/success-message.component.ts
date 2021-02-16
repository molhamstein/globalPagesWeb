import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
    selector: 'success-message',
    templateUrl: 'success-message.component.html',
    styleUrls: ['success-message.component.css']
})
export class SuccessMessageComponent {
    message = ""
    constructor(private api: RequestsService, public thisDialog: MatDialogRef<SuccessMessageComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.message = data['message']
    }
    close() {
        this.thisDialog.close()
    }
    done() {
        this.thisDialog.close(true)
    }

}
