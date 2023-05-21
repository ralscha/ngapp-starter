import {Injectable} from '@angular/core';
import {Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private readonly authService: AuthService,
              private readonly router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isAuthenticated()) {
      return true;
    }

    return this.authService.authenticate().pipe(map(authority => {
        if (authority !== null) {
          return true;
        } else {
          return this.router.createUrlTree(['login']);
        }
      }
    ));
  }
}
