import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { io } from 'socket.io-client';
const serverURL = "http://localhost:3000/";

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  constructor(private router: Router, private httpClient: HttpClient,) { }
   groups:any;
   loggedInUser:any;
   regGroupObj:any = [];
   channel:any ;
   regchannelObj:any = [] ;
   socket:any;
   message:string;
   htmlToAdd:any;

  ngOnInit(): void {
   this.loggedInUser = localStorage.getItem("user");
    console.log("loggedInUser",this.loggedInUser);
    this.fetchGroup();
    this.setupSocketConnection();
  }
  public fetchGroup(){     
      this.httpClient.get(serverURL+'api/groups').subscribe(data => {
        
        this.groups = data;
        let jLoggedinUser = JSON.parse(this.loggedInUser);
        console.log(this.groups);
        for(let i=0;i<this.groups.length;i++){
          
          for(let j=0;j<=this.groups[i].users.length;i++){
            
            if(this.groups[i].users[j] == jLoggedinUser.id){
              this.regGroupObj.push(this.groups[i]);
              console.log("in for loop",this.regGroupObj )
            }
          }
         
        }
        
        console.log(this.regGroupObj);
      }, error => {
  
      });


    

      }
      public selectBasedOngroups(groupId:any){
        
        this.httpClient.get(serverURL+'api/channels').subscribe(data => {
          debugger;
          this.channel = data;
          console.log("this.channel",this.channel)
          for(let i=0;i<=this.channel.length;i++ ){
            debugger;
            if(groupId == this.channel[i].group){
              this.regchannelObj.push(this.channel[i]);
              debugger
            }
          }
          console.log("this.reggroupObj",this.regGroupObj);
        }, error => {
    
        });

}

setupSocketConnection() {
  this.socket = io(serverURL);
  this.socket.on('message-broadcast', (data: string) => {
    if (data) {
     const element = document.createElement('li');
     element.innerHTML = data;
     element.style.background = 'white';
     element.style.padding =  '15px 30px';
     element.style.margin = '10px';
     document.getElementById('chatboxchat')!.appendChild(element);
     }
   });
}

sendMessage() {
  debugger;
  this.socket.emit('message', this.message);
   const element = document.createElement('li');
   element.innerHTML = this.message;
   element.style.background = 'white';
   element.style.padding =  '15px 30px';
   element.style.margin = '10px';
   element.style.textAlign = 'right';
   console.log(element);
  // this.htmlToAdd  = element
  document.getElementById('chatboxchat')!.append(element);
   this.message = '';
}
}


