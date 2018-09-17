import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import { Day } from '../models/birthday/day';
import { Month } from '../models/birthday/month';
import { Year } from '../models/birthday/year';

import { UserService } from '../services/user/user.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	days: Day[] = [];
	months: Month[] = [
		{ id: 1 , name: 'January' },
		{ id: 2 , name: 'February' },
		{ id: 3 , name: 'March' },
		{ id: 4 , name: 'April' },
		{ id: 5 , name: 'May' },
		{ id: 6 , name: 'June' },
		{ id: 7 , name: 'July' },
		{ id: 8 , name: 'August' },
		{ id: 9 , name: 'September' },
		{ id: 10 , name: 'October' },
		{ id: 11 , name: 'November' },
		{ id: 12 , name: 'December' }
	];
	years: Year[] = [];

	signupForm: FormGroup;

	invalidEmail: boolean;
	existedEmail: boolean;
	invalidFirstName: boolean;
	invalidLastName: boolean;
	invalidPassword: boolean;
	invalidRepeatPassword: boolean;
	invalidDate: boolean;

	constructor(private userService: UserService,
		private activatedRoute: ActivatedRoute,
		private route: Router) {
			for (let i = 1; i  <= 31; i++) {
				this.days.push( {id: i, num: i.toString()});
			}

			for (let j = 1, y = 2018; j <= 118; j++, y--) {
				this.years.push( {id: j, num: y.toString()});
			}
		}

		ngOnInit() {
			this.signupForm = new FormGroup({
				'email': new FormControl('', [
					Validators.required,
					Validators.email
				]),
				'firstName': new FormControl('', [
					Validators.required
				]),
				'lastName': new FormControl('', [
					Validators.required
				]),
				'password': new FormControl('', [
					Validators.required,
					Validators.minLength(8)
				]),
				'rpassword': new FormControl('', [
					Validators.required,
					Validators.minLength(8)
				]),
				'day': new FormControl('', [
					Validators.required
				]),
				'month': new FormControl('', [
					Validators.required
				]),
				'year': new FormControl('', [
					Validators.required
				])
			});
		}

		onSignup() {
			this.invalidEmail = false;
			this.invalidFirstName = false;
			this.invalidLastName = false;
			this.invalidPassword = false;
			this.invalidRepeatPassword = false;
			this.invalidDate = false;
			this.existedEmail = false;

			if (!this.signupForm.valid) {
				if (!this.signupForm.get('email').valid) {
					this.invalidEmail = true;
				}

				if (!this.signupForm.get('firstName').valid) {
					this.invalidFirstName = true;
				}

				if (!this.signupForm.get('lastName').valid) {
					this.invalidLastName = true;
				}

				if (!this.signupForm.get('password').valid) {
					this.invalidPassword = true;

				}
				if(this.signupForm.get('password').value.toString()
				!== this.signupForm.get('rpassword').value.toString()){
					this.invalidRepeatPassword = true;
				}

				if (!this.signupForm.get('day').valid || !this.signupForm.get('month').valid || !this.signupForm.get('year').valid) {
					this.invalidDate = true;
				}
			} else {
				const email = this.signupForm.get('email').value.toString();
				const password = this.signupForm.get('password').value.toString();
				const firstName = this.signupForm.get('firstName').value.toString();
				const lastName = this.signupForm.get('lastName').value.toString();
				const dateOfBirth = this.signupForm.get('year').value.toString() + '-'
				+ this.signupForm.get('month').value.toString() + '-'
				+ this.signupForm.get('day').value.toString();
				let date = new Date(dateOfBirth);

				this.userService.signup(email,password,firstName,lastName,date)
				.subscribe(res => {
					if(res.toString() === 'Created'){
						this.route.navigate(['login']);
					}
					else {
						this.existedEmail = true;
					}
					}
					);
			}
		}
	}
