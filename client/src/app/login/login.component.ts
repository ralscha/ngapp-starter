import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {take} from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [FormsModule, InputTextModule, Button]
})
export class LoginComponent implements OnInit {

  readonly #router = inject(Router);
  readonly #authService = inject(AuthService);
  readonly #messageService = inject(MessageService);

  ngOnInit(): void {
    // is the user already authenticated
    this.#authService.authority$.pipe(take(1)).subscribe(authority => {
      if (authority !== null) {
        this.#router.navigate(['home'], {replaceUrl: true});
      }
    });
  }

  async login(username: string, password: string): Promise<void> {
    this.#authService
      .login(username, password)
      .subscribe({
        next: (authority) => {
          if (authority === null) {
            this.handleError('Login failed');
          }
        },
        error: err => this.handleError(err)
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handleError(error: any): Promise<void> {
    let message: string;
    if (typeof error === 'string') {
      message = error;
    } else {
      message = `Unexpected error: ${error.statusText}`;
    }

    this.#messageService.add({key: 'tst', severity: 'error', summary: 'Error', detail: message});
  }

}
