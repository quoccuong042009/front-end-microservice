import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import { AuthenticationService } from '../services/user/authentication.service';
import { UserService } from '../services/user/user.service';

@Component({
	selector: 'app-login',
	providers: [ AuthenticationService, UserService ],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;

	invalidEmail: boolean;
	invalidPassword: boolean;
	wrongEmailOrPassword: boolean;

	redirectUrl: string;

	constructor(private authenticationService: AuthenticationService,
							private userService: UserService,
							private activatedRoute: ActivatedRoute,
							private route: Router) {
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
      this.route.navigate(['']);
    }
  }
}
