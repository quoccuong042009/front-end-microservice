import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../models/user';
import { Order } from '../models/order';

import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
	curUser: User = new User();
	selectedItem: string;

  constructor(private route: Router,
							private router: ActivatedRoute,
							private userService: UserService) { }

  ngOnInit() {
		this.selectedItem = 'item1';
		this.getUser();
  }

	onSignout(){
		this.userService.logout();
		this.route.navigate(['']);
	}

	getUser(){
		this.userService.getUser()
			.subscribe(
				user => {
					this.curUser = user;
				},
				error => console.log(error)
			);
	}
}
