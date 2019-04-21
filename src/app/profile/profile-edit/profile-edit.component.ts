import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../../requests.service';
import {passwordMatcher} from '../../shared/passwordMatcher/password-matcher';
import {format} from "date-fns";
import * as $ from 'jquery'
import {AuthService} from '../../authentication/auth.service';
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit,AfterViewInit {

  constructor(private api:RequestsService,private route:ActivatedRoute,private router:Router,private auth:AuthService) { }
  user={}
  id
  @ViewChild('f') form
  @ViewChild('file') fileController:ElementRef
  ngAfterViewInit() {
  }
  ngOnInit() {
    this.auth.userData.subscribe((data)=>{
      this.id=data['id']
      this.api.get('users/'+data['id']).toPromise().then((data)=>{
        data['birthDate']= format(data['birthDate'],'YYYY-MM-DD')
        this.user=data;
      })
    })
  }
  showImage=true
  editImage(){
    $(this.fileController.nativeElement).trigger('click')
  }
  imageChanged(event){
    let images=new FormData();
    images.append('file', this.fileController.nativeElement.files[0]);
    this.api.post('attachments/images/upload', images).subscribe(res => {
      this.showImage=false;
      this.api.put('users/' + this.id, {imageProfile:res[0].url}).toPromise().then((data) => {
        data['birthDate']= format(data['birthDate'],'YYYY-MM-DD')
        this.user=data;
        this.auth.updateUserData(this.user)
        this.showImage=true
      })
    })

  }
  submit(data){
    if(!this.form.invalid) {
      this.api.put('users/' + this.id, data).toPromise().then((data) => {
        this.auth.updateUserData(data)
        this.router.navigate(['../'],{relativeTo:this.route})
      })
    }
  }

}
