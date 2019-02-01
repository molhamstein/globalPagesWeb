import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../../requests.service';
import {passwordMatcher} from '../../shared/passwordMatcher/password-matcher';
import {format} from "date-fns";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit,AfterViewInit {

  constructor(private api:RequestsService,private route:ActivatedRoute,private router:Router) { }
  user
  id
  @ViewChild('f') form
  ngAfterViewInit() {

  }
  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.id=params['id']
      this.api.get('users/'+params['id']).toPromise().then((data)=>{
        // data['birthDate']= new Date(format(new Date(data['birthDate']),'DD-MM-YYYY'))
        this.user=data;
      })
    })
  }
  submit(data){
    if(!this.form.invalid) {
      this.api.put('users/' + this.id, data).toPromise().then((data) => {
        this.router.navigate(['../'],{relativeTo:this.route})
      })
    }
  }

}
