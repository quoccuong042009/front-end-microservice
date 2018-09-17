import { Component, OnInit } from '@angular/core';
import {IMyDrpOptions} from 'mydaterangepicker';

import { Showtime } from '../../models/showtime';
import { Genre } from '../../models/genre';

import { ShowtimeService } from '../../services/showtime/showtime.service';
import { MovieService } from '../../services/movie/movie.service';
import { ShareService } from '../../services/share/share.service';

@Component({
  selector: 'app-showtime-admin',
  templateUrl: './showtime-admin.component.html',
  styleUrls: ['./showtime-admin.component.css']
})
export class ShowtimeAdminComponent implements OnInit {
	showtimes: Showtime[];

	searchOptions: string[] = ['All', 'Genre', 'Movie Title', 'Date'];
	genreOptions: Genre[] = [];

	selectedGenre: number = 1;
	inputTitle: string = '';

	byAll: boolean = true;
	byTitle: boolean = false;
	byGenre: boolean = false;
	byDate: boolean = false;

	myDateRangePickerOptions: IMyDrpOptions = {
        // other options...
    dateFormat: 'yyyy.mm.dd',
  };
	private dateRangePicked: any;

  constructor(private showtimeService: ShowtimeService,
							private movieService: MovieService,
							private shareService: ShareService) { }

  ngOnInit() {
		this.shareService.emitChange('item5');
		this.getShowtimes();
		this.getGenres();
  }

	getShowtimes(){
		this.showtimeService.getAllShowtimes()
			.subscribe(showtimes => this.showtimes = showtimes)
	}

	getGenres(){
		this.movieService.getGenres()
			.subscribe(genres => this.genreOptions = genres);
	}

	onOptionSelected(index: string){
		this.byAll = false;
		this.byGenre = false;
		this.byTitle = false;
		this.byDate = false;

		if(index === '0'){
			this.byAll = true;
		}
		if(index === '1'){
			this.byGenre = true;
		}
		if(index === '2'){
			this.byTitle = true;
		}
		if(index === '3'){
			this.byDate = true;
		}
	}

	onSubmitAll(){
			this.getShowtimes();
	}

	onSubmitGenre(){
		// console.log(this.selectedGenre);
		this.showtimeService.getShowtimesByGenreId(this.selectedGenre.toString())
			.subscribe(showtimes => this.showtimes = showtimes);
	}

	onSubmitTitle(){
		this.movieService.getMoviesByMovieTitle(this.inputTitle)
			.subscribe(movie => {
				this.showtimeService.getShowtimesByMovieId(movie.movieId.toString())
					.subscribe(showtimes => this.showtimes = showtimes)
			});
	}

	onSubmitDateRange(){
		let startDate = this.dateRangePicked.beginDate.year + '-' + this.dateRangePicked.beginDate.month + '-' + this.dateRangePicked.beginDate.day;
		let endDate = this.dateRangePicked.endDate.year + '-' + this.dateRangePicked.endDate.month + '-' + this.dateRangePicked.endDate.day;

		this.showtimeService.getShowtimesByRangeDate(startDate, endDate)
			.subscribe(showtimes => this.showtimes = showtimes);
	}
}
