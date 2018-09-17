import { Component, OnInit, Input } from '@angular/core';

import { UserService } from '../../../services/user/user.service';

import { User } from '../../../models/user';
import { Status } from '../../../models/status';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {
	@Input() users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

	onDisable(user: User){
		this.userService.disableOrEnableUser(user,2)
			.subscribe(
				() => {},
				error => console.log(error)
			);

			window.location.reload();
	}

	onEnable(user: User){
		this.userService.disableOrEnableUser(user,1)
			.subscribe(
				() => {},
				error => console.log(error)
			);

			window.location.reload();
	}

	isDisable(status: string){
		if(status === 'DISABLE')
			return true;
		else
			return false;
	}

}
