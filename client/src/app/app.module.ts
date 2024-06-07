import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {UserEditComponent} from './user/user-edit/user-edit.component';
import {InputTextModule} from 'primeng/inputtext';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TableModule} from 'primeng/table';
import {ContextMenuModule} from 'primeng/contextmenu';
import {KeyFilterModule} from 'primeng/keyfilter';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {SidebarModule} from 'primeng/sidebar';
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        UserListComponent,
        UserEditComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        InputTextModule,
        ConfirmDialogModule,
        TableModule,
        ContextMenuModule,
        KeyFilterModule,
        CheckboxModule,
        ButtonModule,
        PasswordModule,
        DropdownModule,
        ToastModule,
        InputSwitchModule,
        SidebarModule], providers: [MessageService, ConfirmationService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {
}
