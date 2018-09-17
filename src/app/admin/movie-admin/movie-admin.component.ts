import { Component, OnInit } from '@angular/core';
import { IMyDrpOptions } from 'mydaterangepicker';

import { MovieService } from '../../services/movie/movie.service';
import { ShareService } from '../../services/share/share.service';

import { Movie } from '../../models/movie';
import { Genre } from '../../models/genre';
@Component({
  selector: 'app-movie-admin',
  templateUrl: './movie-admin.component.html',
  styleUrls: ['./movie-admin.component.css']
})
export class MovieAdminComponent implements OnInit {
	movies: Movie[];
	searchOptions: string[] = ['All', 'Genre', 'Movie Title', 'Date'];
	genreOptions: Genre[] = [];

	//for sort orders
	selectedGenre: number = 1;
	inputTitle: string = '';

	byAll: boolean = true;
	byGenre: boolean = false;
	byTitle: boolean = false;
	byDate: boolean = false;

	myDateRangePickerOptions: IMyDrpOptions = {
        // other options...
        dateFormat: 'yyyy.mm.dd',
  };
	private dateRangePicked: any;

  constructor(private movieService: MovieService,
							private shareService: ShareService) { }

  ngOnInit() {
		this.shareService.emitChange('item2');
		this.getGenres();
		this.getMovies();
  }

	getMovies(){
		this.movieService.getMovies()
			.subscribe(movies => this.movies = movies);
	}

	getGenres(){
		this.movieService.getGenres()
			.subscribe(genres => this.genreOptions = genres);
	}

	//onFunction
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
			this.getMovies();
	}

	onSubmitGenre(){
		// console.log(this.selectedGenre);
		this.movieService.getMoviesByGenreId(this.selectedGenre.toString())
			.subscribe(movies => this.movies = movies);
	}

	onSubmitTitle(){
		this.movieService.getMoviesByMovieTitle(this.inputTitle)
			.subscribe(movie => {
				this.movies = [];
				this.movies[0] = movie;
			});
	}

	onSubmitDateRange(){
		let startDate = this.dateRangePicked.beginDate.year + '-' + this.dateRangePicked.beginDate.month + '-' + this.dateRangePicked.beginDate.day;
		let endDate = this.dateRangePicked.endDate.year + '-' + this.dateRangePicked.endDate.month + '-' + this.dateRangePicked.endDate.day;

		this.movieService.getMoviesByRangeDate(startDate, endDate)
			.subscribe(movies => this.movies = movies);

	}
}
