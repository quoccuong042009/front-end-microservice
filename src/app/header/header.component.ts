import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {TOKEN_NAME} from '../services/user/auth.constant';
import { JwtHelperService } from '@auth0/angular-jwt'

import { AuthenticationService } from '../services/user/authentication.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private authenticationService: AuthenticationService,
							private userService: UserService,
							private cookieService: CookieService) { }


	public isLoggedIn() {
		// console.log(this.userService.isLoggedIn());
		return this.userService.isLoggedIn();
	}

	public isUserLoggedIn() {
		const decodedToken = this.jwtHelper.decodeToken(this.cookieService.get(TOKEN_NAME));
		if(decodedToken.authorities[0] === 'STANDARD_USER')
			return true;
		else
			return false;
	}

	public isAdminLoggedIn() {
		const decodedToken = this.jwtHelper.decodeToken(this.cookieService.get(TOKEN_NAME));
		if(decodedToken.authorities[0] === 'ADMIN')
			return true;
		else
			return false;
	}

	public getUsername(){
		return this.userService.getUsername();
	}

	public onSignout(){
		this.userService.logout();
	}
}
