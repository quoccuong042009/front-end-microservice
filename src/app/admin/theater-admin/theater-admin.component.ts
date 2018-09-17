import { Component, OnInit } from '@angular/core';
import { TheaterService } from '../../services/theater/theater.service';
import { ShareService } from '../../services/share/share.service';

import { Theater } from '../../models/theater';
@Component({
  selector: 'app-theater-admin',
  templateUrl: './theater-admin.component.html',
  styleUrls: ['./theater-admin.component.css']
})
export class TheaterAdminComponent implements OnInit {
	theaters: Theater[];
	theaterName: string = '';

  constructor(private theaterService: TheaterService,
							private shareService: ShareService) { }

  ngOnInit() {
		this.shareService.emitChange('item3');
		this.getTheaters();
  }

	getTheaters(){
		this.theaterService.getAllTheater()
			.subscribe(theaters => this.theaters = theaters)
	}

	onCreateTheater(){
		this.theaterService.createTheater(this.theaterName)
			.subscribe(() => {});
		window.location.reload();
	}
}
