import {ConfirmationService, MessageService} from 'primeng/api';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app/app-routing.module';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TableModule} from 'primeng/table';
import {ContextMenuModule} from 'primeng/contextmenu';
import {KeyFilterModule} from 'primeng/keyfilter';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {SelectModule} from 'primeng/select';
import {ToastModule} from 'primeng/toast';
import {ToggleSwitchModule} from 'primeng/toggleswitch';
import {DrawerModule} from 'primeng/drawer';
import {AppComponent} from './app/app.component';
import {importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {providePrimeNG} from 'primeng/config';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import Aura from '@primeng/themes/aura';

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule, InputTextModule, ConfirmDialogModule, TableModule, ContextMenuModule, KeyFilterModule, CheckboxModule, ButtonModule, PasswordModule, SelectModule, ToastModule, ToggleSwitchModule, DrawerModule),
    MessageService, ConfirmationService, provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
}).catch(err => console.error(err));
