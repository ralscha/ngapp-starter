import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(MatSidenav) sideNav: MatSidenav;

  authenticated = false;
  admin = false;
  sideBarOver = false;

  constructor(private readonly router: Router,
              private readonly authService: AuthService) {

    this.authService.authority$.subscribe(authority => {
      this.authenticated = authority != null;
      this.admin = authority === 'ADMIN';

      if (this.authenticated) {
        if (!this.sideBarOver) {
          this.sideNav.open();
        }
        this.router.navigate(['home'], {replaceUrl: true});
      } else {
        if (this.sideNav) {
          this.sideNav.close();
        }
        this.router.navigate(['login'], {replaceUrl: true});
      }

    });
  }

  logout() {
    this.authService.logout().subscribe(() => this.router.navigate(['login'], {replaceUrl: true}));
  }
}
