import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  authenticated!: boolean;
  admin = false;
  sideBarOver = false;
  sidebarOpen = false;

  constructor(private readonly router: Router,
              private readonly authService: AuthService) {


    const so = localStorage.getItem('sidebar-over');
    if (so) {
      this.sideBarOver = JSON.parse(so);
    }

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

  logout(): void {
    this.authService.logout().subscribe(() => this.router.navigate(['login'], {replaceUrl: true}));
  }

  // tslint:disable-next-line:no-any
  onSideBarOverChange(event: any): void {
    this.sideBarOver = event.checked;
    this.sidebarOpen = false;
    localStorage.setItem('sidebar-over', JSON.stringify(this.sideBarOver));
  }
}
