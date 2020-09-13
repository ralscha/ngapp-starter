import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {MessageService} from 'primeng';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private readonly router: Router,
              private readonly authService: AuthService,
              private readonly messageService: MessageService) {
  }

  ngOnInit(): void {
    // is the user already authenticated
    this.authService.authority$.pipe(take(1)).subscribe(authority => {
      if (authority !== null) {
        this.router.navigate(['home'], {replaceUrl: true});
      }
    });
  }

  async login(username: string, password: string): Promise<void> {
    this.authService
      .login(username, password)
      .subscribe(authority => {
          if (authority === null) {
            this.handleError('Login failed');
          }
        },
        err => this.handleError(err));
  }

  // tslint:disable-next-line:no-any
  async handleError(error: any): Promise<void> {
    let message: string;
    if (typeof error === 'string') {
      message = error;
    } else {
      message = `Unexpected error: ${error.statusText}`;
    }

    this.messageService.add({key: 'tst', severity: 'error', summary: 'Error', detail: message});
  }

}
