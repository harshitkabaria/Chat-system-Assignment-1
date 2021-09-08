import { Component, OnInit } from '@angular/core';// ES6 import or TypeScript
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


// CommonJS

const SOCKET_ENDPOINT = 'http://localhost:3000/';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // input vars
  loginUsername:string = "";
//  password: string = "";
  role: string = '';

   constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    console.log(sessionStorage);
		// if (sessionStorage.getItem("username") != null) {
		// 	alert("You are already logged in!")
		// //	this.router.navigateByUrl('/chat');
		// }
    
  }
 
public login(): void{
  if (this.loginUsername === "") {
    alert("You must enter an email and a username!");
    return;
  } else if (typeof(Storage) !== "undefined") {
    const req = this.http.post('http://localhost:3000/api/auth', {
        username: this.loginUsername,
        //email: this.email,
      })
      .subscribe((data: any) => {
          if (data.success) {
            alert("Login Successful!");
           // this.router.navigateByUrl('/chat');
            sessionStorage.setItem("username", data.username);
            sessionStorage.setItem("email", data.email);
            sessionStorage.setItem("role", data.role);
          } else {
            alert('Username/Email incorrect!')
          }
        },
        () => {
          alert('An error has occured trying to create user.')
          console.log("Error occured");
          return;
        });
  } else {
    console.log('Local Storage Undefined');
    alert("Error: Local Storage Undefined!")
    return;
  }
}
 

}
