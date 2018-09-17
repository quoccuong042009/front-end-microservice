import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { TOKEN_NAME } from '../services/user/auth.constant';
import { JwtHelperService } from '@auth0/angular-jwt'

import { AuthenticationService } from '../services/user/authentication.service';
import { UserService } from '../services/user/user.service';

@Component({
	selector: 'app-login',
	providers: [ AuthenticationService, UserService ],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	jwtHelper: JwtHelperService = new JwtHelperService();

	loginForm: FormGroup;

	invalidEmail: boolean;
	invalidPassword: boolean;
	wrongEmailOrPassword: boolean;

	redirectUrl: string;

	constructor(private authenticationService: AuthenticationService,
							private userService: UserService,
							private activatedRoute: ActivatedRoute,
							private route: Router,
							private cookieService: CookieService) {
		this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
	}

	ngOnInit() {
		this.loginForm = new FormGroup({
			'email': new FormControl('', [
				Validators.required,
				Validators.email
			]),
			'password': new FormControl('', [
				Validators.required,
				Validators.minLength(8)
			])
		});
	}

	onLogin(){
		// console.log(this.loginForm);
		this.invalidEmail = false;
		this.invalidPassword = false;
		this.wrongEmailOrPassword = false;
		if (!this.loginForm.valid) {
			if (!this.loginForm.get('email').valid) {
				this.invalidEmail = true;
			}
			if(!this.loginForm.get('email').valid) {
				this.invalidPassword = true;
			}
		}
		else {
			let email = this.loginForm.get('email').value.toString();
			let password = this.loginForm.get('password').value.toString();

			this.authenticationService.login(email,password)
			.subscribe(
				result => {
					if (result) {
						this.userService.login(result);
						this.navigateAfterSuccess();
					}
					else {
						this.wrongEmailOrPassword = true;
					}
				},
				error => {
					this.wrongEmailOrPassword = true;
				}
			);

		}
	}

	private navigateAfterSuccess() {
    if (this.redirectUrl) {
      this.route.navigateByUrl(this.redirectUrl);
    } else {
			const decodedToken = this.jwtHelper.decodeToken(this.cookieService.get(TOKEN_NAME));
			if(decodedToken.authorities[0] === 'ADMIN'){
				this.route.navigate(['admin']);
			}
			else{
				this.route.navigate(['']);
			}
    }
  }
}
