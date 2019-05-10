import { Component, OnInit } from '@angular/core';
import {RequestsService} from '../../requests.service';
import {HttpParams} from '@angular/common/http';
import {AuthService} from '../../authentication/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  showNotification=false
  notifications=[]
  userData
  unseenCounter=0
  constructor(private api:RequestsService,private auth:AuthService) { }

  ngOnInit() {
    this.auth.userData.subscribe((data)=>{
      this.userData=data;
      var p=new HttpParams();
      p=p.set('filter',JSON.stringify({
        where:{
          recipientId:this.userData.id
        }
      }));
      this.api.get('notifications',p).subscribe((data:any[])=>{
        this.unseenCounter=data.filter(not=>!not.seen).length
        this.notifications=data;
      })
    })

  }
  clickHandle(notification){
    if(notification._type=="addNewVolume"){

    }
  }

}
