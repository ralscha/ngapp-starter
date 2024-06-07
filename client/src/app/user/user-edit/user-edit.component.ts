import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {noop} from 'rxjs';
import {tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {CrudUpdateResponse} from '../../model/crud-update-response';
import {NgForm} from '@angular/forms';
import {translateValidationMessage} from '../../util';
import {MessageService, SelectItem} from 'primeng/api';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedObject: any;
  authoritiesOptions: SelectItem[];

  @ViewChild('form') form!: NgForm;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly httpClient: HttpClient,
              private readonly messageService: MessageService,
              private readonly router: Router) {
    this.authoritiesOptions = [{label: 'USER', value: 'USER'}, {label: 'ADMIN', value: 'ADMIN'}];
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(tap(() => this.selectedObject = window.history.state)).subscribe(noop);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  save(value: any): void {
    this.httpClient.post<CrudUpdateResponse>('/be/user-save', {id: this.selectedObject.id, ...value}, {withCredentials: true})
      .subscribe(response => {
        if (response.success) {
          this.messageService.add({
            key: 'tst',
            severity: 'success',
            summary: 'Successfully saved',
            detail: `${value.userName} saved`
          });
          this.router.navigateByUrl('user-list');
        } else {
          this.messageService.add({
            key: 'tst',
            severity: 'error',
            summary: 'Error',
            detail: response.globalError ? response.globalError : `Save not successful`
          });
          if (response.fieldErrors) {
            for (const [key, values] of Object.entries(response.fieldErrors)) {
              const comp = this.form.form.get(key);
              if (comp) {
                const errors = [];
                for (const v of values) {
                  errors.push(translateValidationMessage(v));
                }
                comp.setErrors({server: errors.join(', ')});
              }
            }
          }
        }
      });
  }
}
