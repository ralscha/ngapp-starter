import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {noop} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LabelValue} from '../../label-value';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  selectedObject: any;
  authoritiesOptions: LabelValue[];

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly httpClient: HttpClient) {
    this.authoritiesOptions = [{label: 'USER', value: 'USER'}, {label: 'ADMIN', value: 'ADMIN'}];
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(tap(() => this.selectedObject = window.history.state)).subscribe(noop);
  }

  save(value: any) {
    this.httpClient.post<void>('/be/user-save', {id: this.selectedObject.id, ...value}, {withCredentials: true})
      .subscribe(noop);
  }
}
