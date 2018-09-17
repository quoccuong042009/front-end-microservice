import { Component, OnInit } from '@angular/core';

import { ShareService } from '../services/share/share.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	selectedItem: string;

  constructor(private userService: UserService,
							private shareService: ShareService) { }

  ngOnInit() {
		this.shareService.changeEmitted$.subscribe(
			text => {
            this.selectedItem = text;
        });
  }

	onSignout(){
		this.userService.logout();
	}
}
