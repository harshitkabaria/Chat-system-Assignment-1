import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdduserComponent } from './adduser/adduser.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { ChannelComponent } from './channel/channel.component';
import { GroupComponent } from './group/group.component';
import { AdminComponent } from './admin/admin.component';
import {MatInputModule} from '@angular/material/input';
import{MatButtonModule} from '@angular/material/button';
import{MatFormFieldModule} from '@angular/material/form-field'
import{MatTabsModule} from '@angular/material/tabs'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import{MatSelectModule} from '@angular/material/select';

import {ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {MatListModule} from '@angular/material/list';
import {DemoMaterialModule} from './material';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdduserComponent,
    ChatboxComponent,
    ChannelComponent,
    GroupComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    MatButtonModule,
    MatListModule,
    MatTabsModule,
    MatSelectModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
