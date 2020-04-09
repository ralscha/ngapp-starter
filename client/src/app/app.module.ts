import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  ButtonModule,
  CheckboxModule, ContextMenuModule,
  InputTextModule,
  KeyFilterModule,
  MessageService,
  TableModule,
  ToastModule
} from 'primeng';
import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ngx-custom-validators';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {UserEditComponent} from './user/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserListComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
    TableModule,
    ContextMenuModule,
    KeyFilterModule,
    CheckboxModule,
    ButtonModule,
    ToastModule,
    CustomFormsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}