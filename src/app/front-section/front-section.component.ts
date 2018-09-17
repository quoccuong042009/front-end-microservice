import { Component, OnInit } from '@angular/core';
import { IMyDrpOptions } from 'mydaterangepicker';

import { Movie } from '../models/movie';

import { MovieService } from '../services/movie/movie.service';

@Component({
  selector: 'app-front-section',
  templateUrl: './front-section.component.html',
	providers: [ MovieService ],
  styleUrls: ['./front-section.component.css']
})
export class FrontSectionComponent implements OnInit {
	movies: Movie[];
	selectedItem: string;

	myDateRangePickerOptions: IMyDrpOptions = {
        // other options...
        dateFormat: 'yyyy.mm.dd',
  };
	private dateRangePicked: any;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
		this.selectedItem = 'item1';
		this.getAvaiMoviesByShowtime();
  }

	getAvaiMoviesByShowtime(): void {
		this.movieService.getAvaiMoviesByShowtime()
		.subscribe(
			(movies) => this.movies = movies,
			(error) => console.log(error)
		);
	}

	getMovieByGenre(genreId: string): void{
		this.movieService.getAvaiMoviesByShowtimeAndGenreId(genreId)
			.subscribe(
				(movies) => this.movies = movies,
				(error) => console.log(error)
			);
	}

	onSubmitDateRange(){
		let startDate = this.dateRangePicked.beginDate.year + '-' + this.dateRangePicked.beginDate.month + '-' + this.dateRangePicked.beginDate.day;
		let endDate = this.dateRangePicked.endDate.year + '-' + this.dateRangePicked.endDate.month + '-' + this.dateRangePicked.endDate.day;

		this.movieService.getAvaiMoviesByRangeDate(startDate, endDate)
			.subscribe(movies => this.movies = movies);

	}
}
