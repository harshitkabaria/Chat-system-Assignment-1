import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component'
import { AdduserComponent } from './adduser/adduser.component';
import { GroupComponent } from './group/group.component';
import { ChannelComponent } from './channel/channel.component';
import { AdminComponent } from './admin/admin.component';
import { ChatboxComponent } from './chatbox/chatbox.component';

const routes: Routes = [{path:"login", component: LoginComponent},
{path:"addUser", component: AdduserComponent},
{path:"addGroup", component: GroupComponent},
{path:"addChannel", component: ChannelComponent},
{path:"dashboard", component:AdminComponent},
{path:'chat',component:ChatboxComponent}
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
