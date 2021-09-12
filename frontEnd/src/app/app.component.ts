import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'First page in angular';
  isLoggedin = false;
  
  constructor(private router: Router) { }


  ngOnInit(): void {
    debugger
    console.log("hello",sessionStorage);
		if (localStorage.getItem('user') != null) {
      this.isLoggedin = true;
		}
    else{

      this.isLoggedin = false;
      this.router.navigateByUrl('/login');
    
    }
    
 }
 public logout(){   
  localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  window.location.reload();

 }
}
