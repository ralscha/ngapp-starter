import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ColumnDef} from '../../column-def';
import {finalize} from 'rxjs/operators';
import {MenuItem} from 'primeng';
import {Router} from '@angular/router';
import {UserSerivce} from '../user-service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: any[];
  cols: ColumnDef[];
  loading = false;
  contextMenuItems: MenuItem[];

  constructor(private readonly httpClient: HttpClient,
              private readonly router: Router,
              public readonly userService: UserSerivce) {

    this.contextMenuItems = [
      {label: 'Edit', icon: 'fas fa-pencil-alt', command: () => this.editSelection()},
      {label: 'Delete', icon: 'fas fa-trash-alt', command: () => this.deleteUser()}
    ];

    this.cols = [{
      header: 'Username',
      field: 'userName',
      sortable: true
    }, {
      header: 'Email',
      field: 'email',
      sortable: true
    }, {
      header: 'First Name',
      field: 'firstName',
      sortable: true
    }, {
      header: 'Last Name',
      field: 'lastName',
      sortable: true
    }];

  }

  ngOnInit(): void {
    this.loading = true;
    this.httpClient.get<any[]>('/be/users', {withCredentials: true})
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.users = response);
  }

  trackById(index: number, data: any): number {
    return data.id;
  }

  editSelection() {
    this.router.navigateByUrl('user-edit');
  }

  edit(rowdata: any = null) {
    this.userService.selectedObject = rowdata;
    this.router.navigateByUrl('user-edit');
  }

  private deleteUser() {
    return undefined;
  }
}
