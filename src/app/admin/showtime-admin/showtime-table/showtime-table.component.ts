import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { ShowtimeService } from '../../../services/showtime/showtime.service';

import { ShowtimeDetail } from '../../../models/showtimeDetail';
import { Showtime } from '../../../models/showtime';

@Component({
  selector: 'app-showtime-table',
  templateUrl: './showtime-table.component.html',
  styleUrls: ['./showtime-table.component.css']
})
export class ShowtimeTableComponent implements OnInit, OnChanges {
	@Input() showtimes: Showtime[];
	showtimeDetails: ShowtimeDetail[];
	alreadyHaveOrder: boolean;

  constructor(private showtimeService: ShowtimeService) { }

  ngOnInit() {
  }

	ngOnChanges(){
		this.getShowtimeDetailByShowtimes(this.showtimes);
	}

	getShowtimeDetailByShowtimes(showtimes: Showtime[]){
		this.showtimeService.getShowtimeDetailByShowtimes(showtimes)
			.subscribe(sd => this.showtimeDetails = sd);
	}

	isDisable(status: string){
		if(status === 'DISABLE')
			return true;
		else
			return false;
	}

	onDisable(showtimeId: number){
		this.alreadyHaveOrder = false;

		this.showtimeService.getShowtimeByShowtimeId(showtimeId.toString())
			.subscribe(showtime => {
				this.showtimeService.disableShowtime(showtime)
					.subscribe(res =>{
						if(res === 'Success'){
							window.location.reload();
						}
						else {
							this.alreadyHaveOrder = true;
						}
					})
			})

	}


}
