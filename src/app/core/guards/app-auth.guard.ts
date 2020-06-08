import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {OauthService} from '../services/auth/oauth.service';

@Injectable({
  providedIn: 'root'
})
export class AppAuthGuard implements CanActivate {
  constructor(private router: Router,
              private authService: OauthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    debugger;
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/home'], {queryParams: {returnUrl: state.url}});

    return false;
  }
}

