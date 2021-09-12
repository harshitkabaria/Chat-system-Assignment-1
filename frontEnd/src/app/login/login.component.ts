import { Component, OnInit } from '@angular/core';// ES6 import or TypeScript
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

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

   constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(localStorage);
		if (localStorage.getItem('user') != null) {
				this.router.navigateByUrl('/dashboard');
		}
    else{
      this.router.navigateByUrl('/login');
    }
    
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
         //   alert("Login Successful!");
            console.log("loginpage",data)
            localStorage.setItem('user', JSON.stringify(data));
            
            this.router.navigateByUrl('/dashboard');
            window.location.reload();
            this.toastr.success(`Login Successful!!`, '');
            //window.location.reload();
          } else {
            this.toastr.error('Username incorrect!', '');
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
