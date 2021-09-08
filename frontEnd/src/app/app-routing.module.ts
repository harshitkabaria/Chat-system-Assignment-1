import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component'
import { AdduserComponent } from './adduser/adduser.component';

const routes: Routes = [{path:"login", component: LoginComponent},
{path:"addUser", component: AdduserComponent}
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
