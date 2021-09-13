import { Component, DEFAULT_CURRENCY_CODE, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { io } from 'socket.io-client';

import { SocketServiceService } from '../socket-service.service';
const serverURL = "http://localhost:3000/";


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  constructor(private router: Router, private httpClient: HttpClient,private socketService: SocketServiceService) { }
   groups:any;
   loggedInUser:any;
   regGroupObj:any = [];
   channel:any ;
   regchannelObj:any = [] ;
   isgroupChannelSelected:any = false;
   socket:any;
   message:String;
   htmlToAdd:any;
   messages :any[] = [];
	connection:any;
  dateNow : Date = new Date();
  formatsDateTest: string = 'hh:mm:ss';

  ngOnInit(): void {
     ;
   this.loggedInUser = localStorage.getItem("user");
   if(this.loggedInUser == null){
    this.router.navigateByUrl('/login');
   }

    console.log("loggedInUser",this.loggedInUser);
    this.fetchGroup();
    this.setupSocketConnection();
    this.connection = this.socketService.getMessages().subscribe(message => {
			this.messages.push(message);
			this.message = "";
		});


  }


  public fetchGroup(){     
      this.httpClient.get(serverURL+'api/groups').subscribe(data => {
        
        this.groups = data;
        let jLoggedinUser = JSON.parse(this.loggedInUser);
        console.log("chAT",this.groups);
        for(let i=0;i<this.groups.length;i++){
          debugger;
          
          for(let j=0;j<=this.groups[i].users.length;j++){
            
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
          this.channel = data;
          debugger
          console.log("this.channel",this.channel)
          for(let i=0;i<this.channel.length;i++ ){
            debugger;
            if(groupId == this.channel[i].group){
              this.regchannelObj.push(this.channel[i]);
               
            }
          }
          console.log("this.reggroupObj",this.regGroupObj);
        }, error => {
    
        });

}
public isabletochatNow(){
  
if(this.regchannelObj.length == 0)
{
  this.isgroupChannelSelected == false;
}

else{  
  this.isgroupChannelSelected = true
} 
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
   ;
  // Pushes message to socketService & logs datetime + user who sent the message.
  let date = new Date();
  let user = JSON.parse(this.loggedInUser).username;
  //let usernamestr = username.replace(/\"/g, ""));
  if (this.message == null || this.message === "") {
    alert('You must enter a message to send something!');
  } else {
    this.socketService.sendMessage(user + ":" +this.message );
    this.message = "";
  }
}
}





