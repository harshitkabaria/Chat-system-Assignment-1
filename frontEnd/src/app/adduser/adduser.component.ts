import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  loginUsername: string = '';
	email: string = '';
	role: string = '';
	user:any;
	isthisSuperAdmin:any;

	//deletedUser: string;
	users = [{}];

  ngOnInit(): void {


}

  public addUser(): void {
		// Function used to create user & post to backend API
// 		event.preventDefault();
		if (sessionStorage.role != "user") {
			if (this.loginUsername === "" || this.email === "" || this.role === "") {
				alert("All fields must not be blank!");
			} else {
				const req = this.http.post('http://localhost:3000/api/userRegistration', {
						username: this.loginUsername,
						email: this.email,
						role: this.role
					})
					.subscribe((data: any) => {
							if (data.success) {
								alert('User created successfully!');
								this.loginUsername = '';
								this.email = '';
								this.role = '';
								const req = this.http.post('http://localhost:3000/api/getAllUsers', {})
									.subscribe((data: any) => {
											if (data.userData) {
												console.log('data', data.userData);
												this.users = data.userData;
												console.log('thisusers', this.users);
											} else {
												alert('Error!');
												return;
											}
										},
										err => {
											alert('An error has occured trying to create user.')
											console.log("Error occured");
											return;
										});
							} else {
								alert('Error!');
								return;
							}
						},
						err => {
							alert('An error has occured trying to create user.')
							console.log("Error occured");
							return;
						});
			}
		}
	}

	// public deleteUser(deletedUser) {
	// 	// Deletes a user from the database
	// 	if (sessionStorage.role == "superAdmin") {
	// 		if (deletedUser) {
	// 			event.preventDefault();
	// 			console.log(deletedUser);
	// 			const req = this.http.post('http://localhost:3000/api/del', {
	// 					username: this.deletedUser
	// 				})
	// 				.subscribe((data: any) => {
	// 						console.log(data);
	// 						console.log(data.success);
	// 						if (data.success) {
	// 							alert('User deleted successfully!');
	// 							this.deletedUser = '';
	// 							const req = this.http.post('http://localhost:3000/api/users', {})
	// 								.subscribe((data: any) => {
	// 										if (data.userData) {
	// 											console.log('data', data.userData);
	// 											this.users = data.userData;
	// 											console.log('thisusers', this.users);
	// 										} else {
	// 											alert('Error!');
	// 											return;
	// 										}
	// 									},
	// 									err => {
	// 										alert('An error has occured trying to create user.')
	// 										console.log("Error occured");
	// 										return;
	// 									});
	// 						} else {
	// 							alert('This user does not exist!');
	// 							return;
	// 						}
	// 					},
	// 					err => {
	// 						alert('An error has occured trying to delete user.')
	// 						console.log("Error occured", err);
	// 						return;
	// 					});
	// 		} else {
	// 			alert("You did not select a user to delete!");
	// 		}
	// 	} else {
	// 		alert("You do not have permission to delete users!")
	// 		return;
	// 	}
	// }

}
