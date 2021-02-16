
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestsService } from './requests.service';


@Injectable({
    'providedIn': 'root'
})
export class FollowService {

    userFollowing: Object[] = [];
    userFollowers: Object[] = [];
    businessFollowing: Object[] = [];

    constructor(private api: RequestsService) {
        if (localStorage.getItem('userFollowing') !== null) {
            this.userFollowing = JSON.parse(localStorage.getItem('userFollowing'));
        }
        if (localStorage.getItem('userFollowers') !== null) {
            this.userFollowers = JSON.parse(localStorage.getItem('userFollowers'));
        }
        if (localStorage.getItem('businessFollowing') !== null) {
            this.businessFollowing = JSON.parse(localStorage.getItem('businessFollowing'));
        }
    }

    getUserFollowing(ownerId: string, type: "USER" | "BUSINESS"): Promise<any[]> {
        let params = new HttpParams();
        params = params.set('filter', JSON.stringify({
            "where": {
                "ownerId": ownerId,
                "type": type,
            },
        }));

        return this.api.get(`followers`, params).toPromise().then(
            (res: any[]) => {
                switch (type) {
                    case "USER":
                        localStorage.setItem("userFollowing", JSON.stringify(res));
                        this.userFollowing = res;
                        return this.userFollowing;
                    case "BUSINESS":
                        localStorage.setItem("businessFollowing", JSON.stringify(res));
                        this.businessFollowing = res;
                        return this.businessFollowing;
                    default:
                        return;
                }
            }
        );
    }

    getUserFollower(objectId: string): Promise<any[]> {
        let params = new HttpParams();
        params = params.set('filter', JSON.stringify({
            "where": {
                "objectId": objectId,
                "type": "USER",
            },
        }));

        return this.api.get(`followers`, params).toPromise().then(
            (res: any[]) => {
                localStorage.setItem("userFollowers", JSON.stringify(res));
                this.userFollowers = res;
                return this.userFollowers;
            }
        );
    }

    makeFollow(id: string, type: "USER" | "BUSINESS"): Promise<boolean> {
        return this.api.post(`followers/makeFollow`, { id, type }).toPromise().then(
            (res: any) => {
                switch (type) {
                    case "USER":
                        this.userFollowing.push(res);
                        localStorage.setItem("userFollowing", JSON.stringify(this.userFollowing));
                        return true;
                    case "BUSINESS":
                        this.businessFollowing.push(res);
                        localStorage.setItem("businessFollowing", JSON.stringify(this.businessFollowing));
                        return true;
                    default:
                        return false;
                }
            },
            (error: any) => {
                return false;
            }
        );
    }

    makeUnfollow(id: string, type: "USER" | "BUSINESS"): Promise<boolean> {
        return this.api.delete(`followers/makeUnfollow?id=` + id).toPromise().then(
            (res: any) => {
                switch (type) {
                    case "USER":
                        this.userFollowing = this.userFollowing.filter((user: any) => {
                            return user.objectId !== id;
                        });
                        localStorage.setItem("userFollowing", JSON.stringify(this.userFollowing));
                        return true;
                    case "BUSINESS":
                        this.businessFollowing = this.businessFollowing.filter((business: any) => {
                            return business.objectId !== id;
                        });
                        localStorage.setItem("businessFollowing", JSON.stringify(this.businessFollowing));
                        return true;
                    default:
                        return false;
                }
            },
            (error: any) => {
                return false;
            }
        );
    }

    checkFollowing(id: string, type: "USER" | "BUSINESS"): boolean {
        let index = -1;
        switch (type) {
            case "USER":
                index = this.userFollowing.findIndex((user: any) => {
                    return user.objectId === id;
                });
                return index !== -1;
            case "BUSINESS":
                index = this.businessFollowing.findIndex((business: any) => {
                    return business.objectId === id;
                });
                return index !== -1;
            default:
                return false;
        }
    }

}