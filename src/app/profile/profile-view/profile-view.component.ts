import { Component, OnInit } from '@angular/core';
import {RequestsService} from '../../requests.service';
import {ActivatedRoute} from '@angular/router';
import {format} from 'date-fns'
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  constructor(private api:RequestsService,private route:ActivatedRoute) { }
  user
  id
  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.id=params['id']
      this.api.get('users').toPromise().then((data)=>{
        this.user=data;
      })
      this.api.get('users/'+params['id']).toPromise().then((data)=>{
        data['birthDate']= format(new Date(data['birthDate']),'DD-MM-YYYY')
        this.user=data;
      })
      this.api.get('posts/'+params['id']+'/owner').toPromise().then((data)=>{

      })
      this.api.get('businesses/'+params['id']+'/owner').toPromise().then((data)=>{

      })
    })

  }

}
