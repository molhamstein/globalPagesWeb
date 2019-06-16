import {Component, OnDestroy, OnInit} from '@angular/core';
import {RequestsService} from '../../requests.service';
import {HttpParams} from '@angular/common/http';
import {AuthService} from '../../authentication/auth.service';
import {BehaviorSubject, timer} from 'rxjs';
import {switchMap,exhaustMap,take} from 'rxjs/operators';
import {Router} from '@angular/router';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit,OnDestroy {

  showNotification=false
  notifications=[]
  currentNotification
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
            // .pipe(take(3))
            .pipe(exhaustMap(_=>this.$notifications))
        )
      ).subscribe((data:any[])=>{
        this.unseenCounter=data.filter(not=>!not.seen).length
        this.notifications=data;
      })
    })
    $('html').on('click',(e)=>{
      console.log($(e.target).parents('.notification-button'));
      if(!$(e.target).parents('.notification-button')[0])
        this.close()
    })

  }
  clickHandle(notification){
    let notficationClicked=()=>{
      // return this.api.post('notifications/seenNotification',{notifications:[notification.id]}).toPromise()
      notification['clicked']=true;
      return this.api.put('notifications/'+notification.id,notification).subscribe(_=>this.refresh.next(''))
    };
    if(notification._type=="addNewVolume"){
      this.router.navigate(['volume',notification.data.volumeId]).then(_=>notficationClicked())
    }
  }
  remove(e:Event){
    e.stopPropagation()
    if(this.currentNotification)
      this.deleteNotification(this.currentNotification)
    else
      this.deleteAll()
    return false;
  }
  deleteNotification(not){
    this.api.delete('notifications',not.id).subscribe(_=>this.refresh.next(''))
  }
  deleteAll(){
    this.api.put("notifications/clear",{}).subscribe(_=>this.refresh.next(''))
  }
  open(){
    if(!this.showNotification){
      this.api.post('notifications/seenNotification',{notifications:this.notifications.map(v=>v.id)}).toPromise()
    }
    this.showNotification=!this.showNotification
  }

  ngOnDestroy(): void {
    $('html').off('click');
  }
  close(){
    console.log('close')
    this.showNotification=false
  }

}
