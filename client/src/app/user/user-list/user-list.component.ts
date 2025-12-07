import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ColumnDef} from '../../model/column-def';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';
import {CrudDeleteResponse} from '../../model/crud-delete-response';
import {ConfirmationService, MenuItem, MessageService, PrimeTemplate} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';

import {ContextMenuModule} from 'primeng/contextmenu';
import {User} from "../user";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [ConfirmDialogModule, TableModule, PrimeTemplate, ContextMenuModule, Button]
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  cols: ColumnDef[];
  loading = false;
  contextMenuItems: MenuItem[];
  selectedObject: User | null = null;
  readonly #httpClient = inject(HttpClient);
  readonly #messageService = inject(MessageService);
  readonly #confirmationService = inject(ConfirmationService);
  readonly #router = inject(Router);

  constructor() {

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
    this.#httpClient.get<User[]>('/be/users', {withCredentials: true})
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.users = response);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trackById(index: number, data: any): number {
    return data.id;
  }

  editSelection(): void {
    if (this.selectedObject) {
      this.#router.navigateByUrl('user-edit', {state: this.selectedObject});
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  edit(rowdata: any = null): void {
    this.#router.navigateByUrl('user-edit', {state: rowdata});
  }

  private deleteUser(): void {
    if (!this.selectedObject) {
      return;
    }
    this.#confirmationService.confirm({
      header: 'Delete',
      message: `Really delete ${this.selectedObject.userName}?`,
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      accept: () => {
        this.#httpClient.post<CrudDeleteResponse>('/be/user-delete', this.selectedObject!.id, {withCredentials: true})
          .subscribe(response => {
            if (response.success) {
              this.#messageService.add({
                key: 'tst',
                severity: 'success',
                summary: 'Successfully deleted',
                detail: `${this.selectedObject!.userName} deleted`
              });
              this.ngOnInit();
            } else {
              this.#messageService.add({
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
