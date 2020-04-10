import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ColumnDef} from '../../model/column-def';
import {finalize} from 'rxjs/operators';
import {ConfirmationService, MenuItem, MessageService} from 'primeng';
import {Router} from '@angular/router';
import {CrudDeleteResponse} from '../../model/crud-delete-response';

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
  selectedObject: any;

  constructor(private readonly httpClient: HttpClient,
              private readonly router: Router,
              private readonly messageService: MessageService,
              private readonly confirmationService: ConfirmationService) {

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
    this.router.navigateByUrl('user-edit', {state: this.selectedObject});
  }

  edit(rowdata: any = null) {
    this.router.navigateByUrl('user-edit', {state: rowdata});
  }

  private deleteUser() {
    this.confirmationService.confirm({
      header: 'Delete',
      message: `Really delete ${this.selectedObject.userName}?`,
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      accept: () => {
        this.httpClient.post<CrudDeleteResponse>('/be/user-delete', this.selectedObject.id, {withCredentials: true})
          .subscribe(response => {
            if (response.success) {
              this.messageService.add({
                key: 'tst',
                severity: 'success',
                summary: 'Successfully deleted',
                detail: `${this.selectedObject.userName} deleted`
              });
              this.ngOnInit();
            } else {
              this.messageService.add({
                key: 'tst',
                severity: 'error',
                summary: 'Error',
                detail: response.error
              });
            }
          });
      }
    });

  }
}
