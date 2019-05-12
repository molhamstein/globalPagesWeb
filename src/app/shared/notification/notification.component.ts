import { Component, OnInit } from '@angular/core';
import {RequestsService} from '../../requests.service';
import {HttpParams} from '@angular/common/http';
import {AuthService} from '../../authentication/auth.service';
import {BehaviorSubject, timer} from 'rxjs';
import {switchMap,exhaustMap} from 'rxjs/operators';
import {Router} from '@angular/router';
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
  $notifications
  refresh:BehaviorSubject<any>=new BehaviorSubject('')
  constructor(private api:RequestsService,private auth:AuthService,private router:Router) { }

  ngOnInit() {
    this.auth.userData.subscribe((data)=>{
      this.userData=data;
      var p=new HttpParams();
      p=p.set('filter',JSON.stringify({
        where:{
          recipientId:this.userData.id
        }
      }));
      this.$notifications=this.api.get('notifications',p);
      this.refresh.pipe(
        switchMap(_=>
          timer(0,5000)
            .pipe(exhaustMap(_=>this.$notifications))
        )
      ).subscribe((data:any[])=>{
        this.unseenCounter=data.filter(not=>!not.seen).length
        this.notifications=data;
      })
    })

  }
  clickHandle(notification){
    let notficationSeen=()=>{
      return this.api.post('notifications/seenNotification',{notifications:[notification.id]}).toPromise()
    };
    if(notification._type=="addNewVolume"){
      this.router.navigate(['volume',notification.data.volumeId]).then(_=>notficationSeen())
    }
  }

}
