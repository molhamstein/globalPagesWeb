import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SuccessMessageComponent } from 'src/app/modals/messages/success-message/success-message.component';
import { FollowService } from 'src/app/services/follow.service';
import { EditBasicInformationComponent } from '../../../modals/profile/edit-basic-information/edit-basic-information.component';
import { EditInfoComponent } from '../../../modals/profile/edit-info/edit-info.component';
import { EditSkillComponent } from '../../../modals/profile/edit-skill/edit-skill.component';
import { AuthService } from '../../../services/auth.service';
import { RequestsService } from '../../../services/requests.service';

@Component({
  selector: 'app-cv-view',
  templateUrl: './cv-view.component.html',
  styleUrls: ['./cv-view.component.css']
})
export class CvViewComponent implements OnInit {

  @ViewChild('file', { static: false }) fileController: ElementRef

  constructor(private dialog: MatDialog, private api: RequestsService,
    private router: Router, private route: ActivatedRoute,
    private translteService: TranslateService, private auth: AuthService,
    private followService: FollowService) { }
  user
  similer: any = []
  id
  lang
  isMyCV = false
  isFollowing: boolean;

  ngOnInit() {
    this.lang = this.translteService.currentLang
    this.translteService.onLangChange.subscribe(() => {
      this.lang = this.translteService.currentLang
    })
    this.route.params.subscribe((params) => {
      this.id = params['id']
      this.auth.userData.subscribe((data) => {
        if (data["id"] == this.id)
          this.isMyCV = true
        var filter = { "include": "CV" }
        this.api.get('users/' + this.id + "?filter=" + JSON.stringify(filter)).toPromise().then((data) => {
          this.user = data;
        })
        this.api.get('users/' + this.id + "/getSimilerCV").toPromise().then((data) => {
          this.similer = data;
        })
      })

      this.isFollowing = this.followService.checkFollowing(this.id, "USER");
    })
  }

  updateCV(newCV) {
    var self = this;
    this.api.put('userCVs/updateMyCv/', newCV).toPromise().then((data) => {
      let dialogRef = self.dialog.open(SuccessMessageComponent, {
        //   width: '70%',
        panelClass: 'communictioDialogStyle',
        data: { "message": "successUpdateCV" }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.user = data;
      });

    })
  }

  changeTags(tags) {
    var cv = {};
    let mainCV = this.user.CV
    if (mainCV == null)
      mainCV = {}
    cv['tags'] = tags;
    cv['education'] = mainCV['education']
    cv['experience'] = mainCV['experience']
    cv['cityId'] = mainCV['cityId']
    if (mainCV['behanceLink'] != null)
      cv['behanceLink'] = mainCV['behanceLink']
    if (mainCV['cvURL'] != null)
      cv['cvURL'] = mainCV['cvURL']
    if (mainCV['bio'] != null)
      cv['bio'] = mainCV['bio']
    if (mainCV['primaryIdentifier'] != null)
      cv['primaryIdentifier'] = mainCV['primaryIdentifier']
    if (mainCV['facebookLink'] != null)
      cv['facebookLink'] = mainCV['facebookLink']
    if (mainCV['githubLink'] != null)
      cv['githubLink'] = mainCV['githubLink']
    if (mainCV['twitterLink'] != null)
      cv['twitterLink'] = mainCV['twitterLink']
    if (mainCV['websiteLink'] != null)
      cv['websiteLink'] = mainCV['websiteLink']
    this.updateCV(cv);
  }

  changeInfo(data, index) {
    var cv = {};
    let mainCV = this.user.CV
    if (mainCV == null)
      mainCV = {}
    if (data['action'] == "add") {
      if (data['type'] == "experience") {
        if (mainCV['experience'] == null)
          mainCV['experience'] = []
        mainCV['experience'].push(data['object'])
      }
      else if (data['type'] == "education") {
        if (mainCV['education'] == null)
          mainCV['education'] = []
        mainCV['education'].push(data['object'])
      }
    } else if (data['action'] == "edit") {
      if (data['type'] == "experience") {
        mainCV['experience'][index] = data['object']
      }
      else if (data['type'] == "education") {
        mainCV['education'][index] = data['object']
      }
    }
    else if (data['action'] == "delete") {
      if (data['type'] == "experience") {
        mainCV['experience'].splice(index, 1)
      }
      else if (data['type'] == "education") {
        mainCV['education'].splice(index, 1)
      }
    }

    cv['education'] = mainCV['education']
    cv['experience'] = mainCV['experience']
    cv['tags'] = []
    if (mainCV['tags'])
      mainCV['tags'].forEach(element => {
        cv['tags'].push(element.id)
      });
    cv['cityId'] = mainCV['cityId']
    if (mainCV['behanceLink'] != null)
      cv['behanceLink'] = mainCV['behanceLink']
    if (mainCV['bio'] != null)
      cv['bio'] = mainCV['bio']
    if (mainCV['primaryIdentifier'] != null)
      cv['primaryIdentifier'] = mainCV['primaryIdentifier']
    if (mainCV['cvURL'] != null)
      cv['cvURL'] = mainCV['cvURL']
    if (mainCV['facebookLink'] != null)
      cv['facebookLink'] = mainCV['facebookLink']
    if (mainCV['githubLink'] != null)
      cv['githubLink'] = mainCV['githubLink']
    if (mainCV['twitterLink'] != null)
      cv['twitterLink'] = mainCV['twitterLink']
    if (mainCV['websiteLink'] != null)
      cv['websiteLink'] = mainCV['websiteLink']
    this.updateCV(cv);

  }

  changeBasicInfo(data) {
    var cv = {}
    var mainCV = this.user.CV
    if (mainCV == null)
      mainCV = {}
    cv['username'] = data['username']
    cv['phoneNumber'] = data['phoneNumber']
    cv['imageProfile'] = data['imageProfile']
    cv['education'] = mainCV['education']
    cv['experience'] = mainCV['experience']
    cv['tags'] = []
    if (mainCV['tags'])
      mainCV['tags'].forEach(element => {
        cv['tags'].push(element.id)
      });
    if (data['cityId'] != null)
      cv['cityId'] = data['cityId']
    if (data['behanceLink'] != null)
      cv['behanceLink'] = data['behanceLink']
    if (data['bio'] != null)
      cv['bio'] = data['bio']
    if (data['primaryIdentifier'] != null)
      cv['primaryIdentifier'] = data['primaryIdentifier']
    if (data['facebookLink'] != null)
      cv['facebookLink'] = data['facebookLink']
    if (data['githubLink'] != null)
      cv['githubLink'] = data['githubLink']
    if (data['twitterLink'] != null)
      cv['twitterLink'] = data['twitterLink']
    if (data['websiteLink'] != null)
      cv['websiteLink'] = data['websiteLink']

    if (mainCV['cvURL'] != null)
      cv['cvURL'] = mainCV['cvURL']
    this.updateCV(cv);
  }

  changeCvUrl(url) {
    var cv = {};
    let mainCV = this.user.CV
    if (mainCV == null)
      mainCV = {}
    cv['cvURL'] = url
    cv['tags'] = []
    if (mainCV['tags'])
      mainCV['tags'].forEach(element => {
        cv['tags'].push(element.id)
      });
    cv['education'] = mainCV['education']
    cv['experience'] = mainCV['experience']
    cv['cityId'] = mainCV['cityId']
    if (mainCV['behanceLink'] != null)
      cv['behanceLink'] = mainCV['behanceLink']
    if (mainCV['bio'] != null)
      cv['bio'] = mainCV['bio']
    if (mainCV['primaryIdentifier'] != null)
      cv['primaryIdentifier'] = mainCV['primaryIdentifier']
    if (mainCV['facebookLink'] != null)
      cv['facebookLink'] = mainCV['facebookLink']
    if (mainCV['githubLink'] != null)
      cv['githubLink'] = mainCV['githubLink']
    if (mainCV['twitterLink'] != null)
      cv['twitterLink'] = mainCV['twitterLink']
    if (mainCV['websiteLink'] != null)
      cv['websiteLink'] = mainCV['websiteLink']
    this.updateCV(cv);
  }

  editInfo(type, object = null, index = null) {
    let self = this;
    let dialogRef = this.dialog.open(EditInfoComponent, {
      //   width: '70%',
      panelClass: 'communictioDialogStyle',
      data: { "type": type, "object": object }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        self.changeInfo(result, index)
      }
    });
  }

  editSkills() {
    let self = this;
    var tags = []
    if (this.user.CV)
      tags = this.user.CV.tags
    let dialogRef = this.dialog.open(EditSkillComponent, {
      //   width: '70%',
      panelClass: 'communictioDialogStyle',
      data: { "tags": tags }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        self.changeTags(result)
      }
    });
  }

  editBasicInfo() {
    let self = this;
    let dialogRef = this.dialog.open(EditBasicInformationComponent, {
      //   width: '70%',
      panelClass: 'communictioDialogStyle',
      data: { "user": this.user }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        self.changeBasicInfo(result)
      }
    });
  }

  goToCv(id) {
    this.isMyCV = false;
    this.router.navigate(["cv/" + id, { state: { example: 'bar' } }]);
  }

  editCv() {
    $('#file').trigger('click')
  }
  imageChanged() {
    let images = new FormData();
    images.append('file', this.fileController.nativeElement.files[0]);
    this.api.post('attachments/cv/upload', images).subscribe(res => {
      this.changeCvUrl(res[0].url)
    })

  }

  toggleFollowing() {
    if (this.isFollowing) {
      this.followService.makeUnfollow(this.id, "USER").then(res => {
        (res ? this.isFollowing = !this.isFollowing : this.isFollowing);
      });
    }
    else {
      this.followService.makeFollow(this.id, "USER").then(res => {
        (res ? this.isFollowing = !this.isFollowing : this.isFollowing);
      });
    }
  }


}
