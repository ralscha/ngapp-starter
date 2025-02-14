import {Component} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {AuthService} from './auth.service';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [ToastModule, SidebarModule, RouterLink, RouterLinkActive, RouterOutlet]
})
export class AppComponent {
  authenticated!: boolean;
  admin = false;
  sidebarOpen = false;

  constructor(private readonly router: Router,
              private readonly authService: AuthService) {

    this.authService.authority$.subscribe(authority => {
      this.authenticated = authority != null;
      this.admin = authority === 'ADMIN';

      if (this.authenticated) {
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

}
