import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, timer } from 'rxjs';
import { exhaustMap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { RequestsService } from '../../../services/requests.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  showNotification = false
  notifications = []
  currentNotification
  userData
  unseenCounter = 0
  $notifications
  refresh: BehaviorSubject<any> = new BehaviorSubject('')
  constructor(private api: RequestsService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.userData.subscribe((data) => {
      this.userData = data;
      var p = new HttpParams();
      p = p.set('filter', JSON.stringify({
        where: {
          recipientId: this.userData.id
        },
        order: "creationDate DESC"
      }));
      this.$notifications = this.api.get('notifications', p);
      this.refresh.pipe(
        switchMap(_ =>
          timer(0, 5000)
            // .pipe(take(3))
            .pipe(exhaustMap(_ => this.$notifications))
        )
      ).subscribe((data: any[]) => {
        this.unseenCounter = data.filter(not => !not.seen).length
        this.notifications = data;
      })
    })
    $('html').on('click', (e) => {
      if (!$(e.target).parents('.notification-button')[0])
        this.close()
    })

  }

  clickHandle(notification) {
    let notficationClicked = () => {
      notification['clicked'] = true;
      return this.api.put('notifications/' + notification.id, notification).subscribe(_ => this.refresh.next(''))
    };
    if (notification.data.volumeId)
      this.router.navigate(['volume', notification.data.volumeId]).then(_ => notficationClicked());
    if (notification.data.adId)
      this.router.navigate(['ad', notification.data.adId]).then(_ => notficationClicked());
    if (notification.data.marketProductId)
      this.router.navigate(['products', notification.data.marketProductId]).then(_ => notficationClicked());
    if (notification.data.businessId)
      this.router.navigate(['business', notification.data.businessId]).then(_ => notficationClicked());
    if (notification.data.jobId)
      this.router.navigate(['job', notification.data.jobId]).then(_ => notficationClicked());
  }

  remove(e: Event) {
    e.stopPropagation()
    if (this.currentNotification)
      this.deleteNotification(this.currentNotification)
    else
      this.deleteAll()
    return false;
  }

  deleteNotification(not) {
    this.api.delete('notifications', not.id).subscribe(_ => this.refresh.next(''))
  }

  deleteAll() {
    this.api.put("notifications/clear", {}).subscribe(_ => this.refresh.next(''))
  }

  open() {
    if (!this.showNotification) {
      this.api.post('notifications/seenNotification', { notifications: this.notifications.map(v => v.id) }).toPromise()
    }
    this.showNotification = !this.showNotification
  }

  close() {
    this.showNotification = false
  }

  ngOnDestroy(): void {
    $('html').off('click');
  }

}
