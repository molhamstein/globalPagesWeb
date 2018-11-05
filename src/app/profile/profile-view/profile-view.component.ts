import { Component, OnInit } from '@angular/core';
import {RequestsService} from '../../requests.service';
import {ActivatedRoute} from '@angular/router';
import {format} from 'date-fns'
import {HttpParams} from '@angular/common/http';
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  constructor(private api:RequestsService,private route:ActivatedRoute) { }
  user
  id
  ads
  businesses
  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.id=params['id']
      // this.api.get('users').toPromise().then((data)=>{
      //
      // })
      this.api.get('users/'+params['id']).toPromise().then((data)=>{
        data['birthDate']= format(new Date(data['birthDate']),'DD-MM-YYYY')
        this.user=data;
      })
      var p=new HttpParams()
      p=p.set('filter',JSON.stringify({
        where:{
          ownerId:this.id
        }
      }))
      this.api.get('posts',p).toPromise().then((data)=>{
        this.ads=data
      })
      this.api.get('businesses',p).toPromise().then((data)=>{
        this.businesses=data
      })
    })

  }

}
