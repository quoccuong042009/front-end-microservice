import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user/user.service';
import { ShareService } from '../../services/share/share.service';

import { User } from '../../models/user';
import { Status } from '../../models/status';

@Component({
  selector: 'app-customer-admin',
  templateUrl: './customer-admin.component.html',
  styleUrls: ['./customer-admin.component.css']
})
export class CustomerAdminComponent implements OnInit {
	users: User[] = []

  constructor(private userService: UserService,
							private shareService: ShareService) { }

  ngOnInit() {
		this.shareService.emitChange('item4');
		this.getUsers();
  }

	getUsers(){
		this.userService.getAllUsers()
			.subscribe(users => this.users = users);
	}
}
