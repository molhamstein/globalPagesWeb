import { Component, OnInit } from '@angular/core';
import { FollowService } from 'src/app/services/follow.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.css']
})
export class FollowListComponent implements OnInit {

  userId: string;
  userFollowing: any[];
  userFollowers: any[];
  businessFollowing: any[];

  constructor(private followService: FollowService) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem(environment.userDetails));
    this.userId = user['userId'];

    this.followService.getUserFollower(this.userId).then(res => this.userFollowers = res);
    this.followService.getUserFollowing(this.userId, "USER").then(res => this.userFollowing = res);
    this.followService.getUserFollowing(this.userId, "BUSINESS").then(res => this.businessFollowing = res);
  }

  checkFollowing(id: string) {

  }

  toggleFollowing(id: string) {

  }

}
