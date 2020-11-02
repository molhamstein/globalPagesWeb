import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FollowService } from 'src/app/services/follow.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FollowListComponent implements OnInit {

  user: any; 
  userId: string;
  userFollowing: any[];
  userFollowers: any[];
  businessFollowing: any[];

  constructor(private followService: FollowService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem(environment.userDetails));
    this.userId = this.user['userId'];

    this.followService.getUserFollower(this.userId).then(res => this.userFollowers = res);
    this.followService.getUserFollowing(this.userId, "USER").then(res => this.userFollowing = res);
    this.followService.getUserFollowing(this.userId, "BUSINESS").then(res => this.businessFollowing = res);
  }

  toggleFollowing(id: string, type: "USER" | "BUSINESS") {

    let isFollowing = this.isFollowing(id, type);

    if (isFollowing) {
      this.followService.makeUnfollow(id, type).then(res => {
      });
    }
    else {
      this.followService.makeFollow(id, type).then(res => {
      });
    }

  }

  isFollowing(id: string, type: "USER" | "BUSINESS") : boolean  { 
      return this.followService.checkFollowing(id, type);      
  }
}
