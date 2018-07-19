import { Component } from '@angular/core';

import {TOKEN_NAME} from '../services/user/auth.constant';

import { AuthenticationService } from '../services/user/authentication.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-header',
	providers: [ AuthenticationService, UserService ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authenticationService: AuthenticationService,
							private userService: UserService) { }


	public isLoggedIn() {
		return this.userService.isLoggedIn();
	}

	public getUsername(){
		return this.userService.getUsername();
	}
}
