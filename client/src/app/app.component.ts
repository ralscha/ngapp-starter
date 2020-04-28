import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  authenticated = false;
  admin = false;
  sideBarOver = false;
  sidebarOpen: boolean;

  constructor(private readonly router: Router,
              private readonly authService: AuthService) {

    this.authService.authority$.subscribe(authority => {
      this.authenticated = authority != null;
      this.admin = authority === 'ADMIN';

      if (this.authenticated) {
        if (!this.sideBarOver) {
          this.sidebarOpen = true;
        }
        this.router.navigate(['home'], {replaceUrl: true});
      } else {
        this.sidebarOpen = false;
        this.router.navigate(['login'], {replaceUrl: true});
      }

    });
  }

  logout() {
    this.authService.logout().subscribe(() => this.router.navigate(['login'], {replaceUrl: true}));
  }

  onSideBarOverChange(event: any) {
    this.sideBarOver = event.checked;
    if (this.sideBarOver) {
      this.sidebarOpen = false;
    } else {
      this.sidebarOpen = true;
    }
  }
}
