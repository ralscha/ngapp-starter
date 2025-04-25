import {inject, NgModule} from '@angular/core';
import {RedirectCommand, Router, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {UserEditComponent} from './user/user-edit/user-edit.component';
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {map} from "rxjs/operators";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [canActivate]},
  {path: 'user-list', component: UserListComponent, canActivate: [canActivate]},
  {path: 'user-edit', component: UserEditComponent, canActivate: [canActivate]},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

function canActivate(): boolean | Observable<RedirectCommand | boolean> {
  const authService = inject(AuthService)
  if (authService.isAuthenticated()) {
    return true;
  }

  return authService.authenticate().pipe(map(authority => {
      if (authority !== null) {
        return true;
      }
      return new RedirectCommand(inject(Router).parseUrl('/login'), {
        replaceUrl: true
      });
    }
  ));
}
