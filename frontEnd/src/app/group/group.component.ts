import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  groupname: string = '';
	//deletedGroup: string;
	groups:any[] | undefined;
	groupName:string=''

  ngOnInit(): void {
	this.http.post('http://localhost:3000/api/allGroups', {})
	.subscribe((data: any) => {
			if (data.groupData) {
				console.log('groupdata', data.groupData);
				this.groups = data.groupData;

				console.log('thisgroups', this.groups);
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

  public createGroup() {
		// Function used to create group & post to backend API
		//event.preventDefault();
		if (!this.groupname) {
			alert("Group name field must not be blank!");
		} else {
			const req = this.http.post('http://localhost:3000/api/addGroup', {
					groupname: this.groupname
				})
				.subscribe((data: any) => {
						if (data.success) {
							console.log(data);
							alert('Group created successfully!');
							this.groupname = '';
							
						} else {
							alert('Group already exists!');
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
