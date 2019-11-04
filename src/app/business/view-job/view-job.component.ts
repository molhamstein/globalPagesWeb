import { AuthService } from './../../authentication/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Component } from '@angular/core';
import { RequestsService } from 'src/app/requests.service';
import { TranslateService } from '@ngx-translate/core';
import { VerificationMessageComponent } from 'src/app/verification-message/verification-message.component';
import { SuccessMessageComponent } from 'src/app/success-message/success-message.component';

@Component({
    selector: 'view-job',
    templateUrl: 'view-job.component.html',
    styleUrls: ['view-job.component.scss']
})
export class ViewJobComponent {

    constructor(private dialog: MatDialog, private router: Router, private api: RequestsService, private route: ActivatedRoute, private translteService: TranslateService, private auth: AuthService) { }
    job
    similer: any = []
    id
    lang
    employee
    isMyJob = false
    canApply = false;
    currentTab = 'home'

    statusArray = [
        { "value": "pending", "view": "pending" },
        { "value": "interviewing", "view": "interviewing" },
        { "value": "hire", "view": "hire" },
        { "value": "noHire", "view": "noHire" },
    ]
    ngOnInit() {
        $("#usersTab").hide();

        this.lang = this.translteService.currentLang
        this.translteService.onLangChange.subscribe(() => {
            this.lang = this.translteService.currentLang
        })
        this.route.params.subscribe((params) => {
            this.id = params['id']
            console.log(this.auth.getUserDataLocal())
            this.api.get('jobOpportunities/' + this.id + "/getJobOpportunity").toPromise().then((data) => {
                this.job = data;
                // this.auth.userData.subscribe((userData) => {
                var userData = this.auth.getUserDataLocal()
                if (data["ownerId"] == userData['id'])
                    this.isMyJob = true
                else {
                    this.canApply = true;
                }
                // })
                // this.api.get('users/' + this.id + "/getSimilerCV").toPromise().then((data) => {
                //     this.similer = data;
                // })
            })
        })
    }

    changeTab(newTab) {
        if (newTab == this.currentTab) {
            return
        }
        this.currentTab = newTab
        if (newTab == 'users') {
            this.api.get('jobOpportunities/' + this.id + "/employee").toPromise().then((data) => {
                this.employee = data;
            })
            $("#homeTab").fadeOut(300).promise().done(function () {
                $("#usersTab").fadeIn(300);
            });
        }
        else {
            $("#usersTab").fadeOut(300).promise().done(function () {
                $("#homeTab").fadeIn(300);
            });
        }
    }


    deactive() {
        let self = this;
        let dialogRef = this.dialog.open(VerificationMessageComponent, {
            //   width: '70%',
            panelClass: 'communictioDialogStyle',
            data: { "message": "deactiveJob" }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.api.patch('jobOpportunities/' + this.id, { status: 'deactive' }).toPromise().then((data) => {
                    let dialogRef = self.dialog.open(SuccessMessageComponent, {
                        //   width: '70%',
                        panelClass: 'communictioDialogStyle',
                        data: { "message": "successDeactive" }
                    });
                    dialogRef.afterClosed().subscribe(result => {
                        self.job.status = 'deactive'
                    });

                })
            }
        });
    }
    goToEdit() {
        this.router.navigate(["editJobOpportunity/" + this.id]);
    }

    goToLogin() {
        this.router.navigate(["auth/login/"]);
    }

    goToCv(id) {
        this.router.navigate(["cv/" + id]);
    }

    apply() {
        let self = this;
        let dialogRef = this.dialog.open(VerificationMessageComponent, {
            //   width: '70%',
            panelClass: 'communictioDialogStyle',
            data: { "message": "applyMessage" }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.api.post('jobOpportunityUsers/' + this.id + '/applyJobOpportunity', {}).toPromise().then((data) => {
                    let dialogRef = self.dialog.open(SuccessMessageComponent, {
                        //   width: '70%',
                        panelClass: 'communictioDialogStyle',
                        data: { "message": "successAppliy" }
                    });
                    dialogRef.afterClosed().subscribe(result => {
                        self.job.userIsApplied = true
                    });

                })
            }
        });
    }

    changeStauts(index) {

        var object = this.employee[index];
        let self = this;
        let dialogRef = this.dialog.open(VerificationMessageComponent, {
            //   width: '70%',
            panelClass: 'communictioDialogStyle',
            data: { "message": "changeEmployeeStatus" }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.api.put('jobOpportunityUsers/' + object.id + '/changeStatus', { "newStatus": object.status }).toPromise().then((data) => {
                    let dialogRef = self.dialog.open(SuccessMessageComponent, {
                        //   width: '70%',
                        panelClass: 'communictioDialogStyle',
                        data: { "message": "successChangeStaus" }
                    });
                    dialogRef.afterClosed().subscribe(result => {
                    });
                })
            }
        })
    }
}
