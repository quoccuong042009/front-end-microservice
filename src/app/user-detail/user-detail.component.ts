import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../models/user';
import { Order } from '../models/order';

import { UserService } from '../services/user/user.service';
import { ShareService } from '../services/share/share.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
	curUser: User = new User();
	selectedItem: string;

  constructor(private route: Router,
							private userService: UserService,
							private shareService: ShareService) { }

  ngOnInit() {
		// this.selectedItem = 'item1';
		this.shareService.changeEmitted$.subscribe(
			text => {
            this.selectedItem = text;
        });
		this.getUser();
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
