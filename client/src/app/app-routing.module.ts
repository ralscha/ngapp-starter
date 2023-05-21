import {inject, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {UserEditComponent} from './user/user-edit/user-edit.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [() => inject(AuthGuard).canActivate()]},
  {path: 'user-list', component: UserListComponent, canActivate: [() => inject(AuthGuard).canActivate()]},
  {path: 'user-edit', component: UserEditComponent, canActivate: [() => inject(AuthGuard).canActivate()]},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
