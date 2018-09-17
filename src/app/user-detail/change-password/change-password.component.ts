import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import { User } from '../../models/user';

import { UserService } from '../../services/user/user.service';
import { ShareService } from '../../services/share/share.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
	changePassForm: FormGroup;

	invalid2: boolean;
	invalid3: boolean;
	invalidRepeatPassword: boolean;
	invalidOldPassword: boolean;

  constructor(private userService: UserService,
							private activatedRoute: ActivatedRoute,
							private route: Router,
							private shareService: ShareService) { }

  ngOnInit() {
		this.shareService.emitChange('item2');
		this.changePassForm = new FormGroup({
			'password': new FormControl('', [
				Validators.required,
				Validators.minLength(8)
			]),
			'repassword': new FormControl('', [
				Validators.required,
				Validators.minLength(8)
			])
		});
  }

	onSubmit(){
		this.invalid2 = false;
		this.invalid3 = false;
		this.invalidOldPassword = false;

		if (!this.changePassForm.valid) {

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
				let rePass = this.changePassForm.get('repassword').value.toString();

				this.userService.getUser()
					.subscribe(user => {
						this.userService.changePassword(user, rePass)
							.subscribe(() => {
								this.userService.logout();
								this.navigateAfterSuccess();
							}
						)
				});
		}
	}

	private navigateAfterSuccess() {
    this.route.navigate(['login']);
  }

}
