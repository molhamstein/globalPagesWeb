import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifyGuard implements CanActivate {


  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let userDetails = JSON.parse(localStorage.getItem(environment.userDetails));

    if (userDetails && userDetails.user && userDetails.user.status === "pending") {
      this.router.navigate(['/verification']);
      return false;
    }

    return true;
  }

}
