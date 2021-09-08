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
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdduserComponent,
    ChatboxComponent,
    ChannelComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
