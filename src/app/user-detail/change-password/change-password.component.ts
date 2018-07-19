import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import { User } from '../../models/user';

import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
	changePassForm: FormGroup;

	oldPassword: string;
	invalid1: boolean;
	invalid2: boolean;
	invalid3: boolean;
	invalidRepeatPassword: boolean;
	invalidOldPassword: boolean;

  constructor(private userService: UserService,
							private activatedRoute: ActivatedRoute,
							private route: Router) { }

  ngOnInit() {

		this.changePassForm = new FormGroup({
			'oldpassword': new FormControl('', [
				Validators.required,
				Validators.minLength(8)
			]),
			'password': new FormControl('', [
				Validators.required,
				Validators.minLength(8)
			]),
			'repassword': new FormControl('', [
				Validators.required,
				Validators.minLength(8)
			])
		});

		this.userService.getUser()
			.subscribe(user => console.log(user.password));
  }

	onSubmit(){
		this.invalid1 = false;
		this.invalid2 = false;
		this.invalid3 = false;
		this.invalidOldPassword = false;

		if (!this.changePassForm.valid) {
			if (!this.changePassForm.get('oldpassword').valid) {
				this.invalid1 = true;
			}

			if(!this.changePassForm.get('password').valid) {
				this.invalid2 = true;
			}
			if(!this.changePassForm.get('repassword').valid) {
				this.invalid3 = true;
			}

			if(this.changePassForm.get('password').value.toString()
			!== this.changePassForm.get('repassword').value.toString()){
				this.invalidRepeatPassword = true;
			}
		}
		else {
			// if( this.oldPassword !== this.changePassForm.get('oldpassword').value.toString()){
			// 	this.invalidOldPassword = true;
			// }
			// else {
				let rePass = this.changePassForm.get('repassword').value.toString();

				this.userService.getUser()
					.subscribe(user => {
						this.userService.changePassword(user, rePass)
							.subscribe((response: Response) =>{
								console.log(response);
								// if(res){
								// 	this.userService.logout();
								// 	this.navigateAfterSuccess();
								// }
							}
						)
					});
			// }
		}
	}

	private navigateAfterSuccess() {
    this.route.navigate(['login']);
  }

}
