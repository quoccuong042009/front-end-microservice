import { Component, OnInit } from '@angular/core';

import { MovieService } from '../../../../services/movie/movie.service';

import { TheaterService } from '../../../../services/theater/theater.service';

import { Movie } from '../../../../models/movie';
import { Theater } from '../../../../models/theater';

@Component({
  selector: 'app-add-showtime-table',
  templateUrl: './add-showtime-table.component.html',
  styleUrls: ['./add-showtime-table.component.css']
})
export class AddShowtimeTableComponent implements OnInit {
	NumberOfNextDate: number = 7;

	// date: string[] = ['2018-12-1','2018-12-2','2018-12-3','2018-12-3','2018-12-4','2018-12-5','2018-12-6'];
	dates: Date[] = [];
	// theaters2: string[] = ['CGV','HBO','Cinemark','AMC'];
	theaters: Theater[] = []
	// tableMovie: string[][][]= [
	// 	[[],['a'],['a'],['a'],['a'],['a'],['a']],
	// 	[['b'],['b'],['b'],['b'],['b'],['b'],['b']],
	// 	[['c'],['c'],['c'],['c'],['c'],['c'],['c']],
	// 	[['d'],['d'],['d'],['d'],['d'],['d'],['d']]
	// ]

	tableMovie: Movie[][][];

  constructor(private movieService: MovieService,
							private theaterService: TheaterService) { }

  ngOnInit() {
		this.getTheaters();
		this.getNNextDates(this.NumberOfNextDate);
		this.getAvaiMovieNextNdate(this.NumberOfNextDate);
  }

	getTheaters(){
		this.theaterService.getAllTheater()
			.subscribe(theaters => this.theaters = theaters);
	}

	getNNextDates(n: number){
		this.movieService.getNextNDate(n)
			.subscribe(dates => this.dates = dates);
	}

	getAvaiMovieNextNdate(n: number){
		this.movieService.getAvaiMoviesForNextNdate(n)
			.subscribe(tableMovie => this.tableMovie = tableMovie);
	}

	isEmpty(listMovie: string[]){
		return listMovie.length === 0;
	}
}
