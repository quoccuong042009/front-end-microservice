import { Injectable  } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import {TOKEN_NAME} from './auth.constant';

import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  jwtHelper: JwtHelperService = new JwtHelperService();
  isAdmin: boolean;
	// user: User;

	private userUrl = 'http://localhost:8765/user-service';

  constructor(private http: HttpClient,
							private cookieService: CookieService) {
  }

  login(accessToken: string) {
    const decodedToken = this.jwtHelper.decodeToken(accessToken);
    this.isAdmin = decodedToken.authorities.some(el => el === 'ADMIN');
		this.cookieService.set(TOKEN_NAME, accessToken);
		// this.getUser().subscribe(user => this.user = user);
  }

  logout() {
		this.isAdmin = false;
    this.cookieService.delete(TOKEN_NAME);
  }

  isAdminUser(): boolean {
    return this.isAdmin;
  }

  isUser(): boolean {
    return this.cookieService.get(TOKEN_NAME) && !this.isAdmin;
  }

	signupService(email: string,
		password: string,
		firstName: string,
		lastName: string,
		dateOfBirth: string) {
		const url = `${this.userUrl}/${'public/add-user'}`;
		const body = {
				'firstName': firstName,
				'lastName': lastName,
        'email': email,
				'password': password,
				'role': {
            'roleId': 2,
            'role': 'STANDARD_USER'
        },
        'status': {
            'statusID': 1,
            'status': 'ENABLE'
        },
				'dateOfBirth': dateOfBirth
    };
		return this.http.post(url, body);
	}

	getUser(){
		const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
        })
    };

		const url = `${this.userUrl}/${'protected/user/'}` + this.getUsername();
		return this.http.get<User>(url,httpOptions);
	}

	isLoggedIn(){
    return !this.jwtHelper.isTokenExpired(this.cookieService.get(TOKEN_NAME));
	}

	getUsername(){
		return this.jwtHelper.decodeToken(this.cookieService.get(TOKEN_NAME)).user_name;
	}

	changePassword(user: User, updatedPass: string){
		const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
        })
    };

		const url = `${this.userUrl}/${'protected/user/password/'}` + user.userId;

		const body = {
				'firstName': user.firstName,
				'lastName': user.lastName,
        'email': user.email,
				'password': updatedPass,
				'role': {
            'roleId': 2,
            'role': 'STANDARD_USER'
        },
        'status': {
            'statusID': 1,
            'status': 'ENABLE'
        },
				'dateOfBirth': user.dateOfBirth
    };

		return this.http.put(url,body,httpOptions);
	}
}
