import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MovieService } from '../services/movie/movie.service';
import { ShowtimeService } from '../services/showtime/showtime.service';
import { TheaterService } from '../services/theater/theater.service';

import { Movie } from '../models/movie';
import { Showtime } from '../models/showtime';
import { Genre } from '../models/genre';
import { Theater } from '../models/theater';

@Component({
	selector: 'app-book-movie',
	providers: [ MovieService, ShowtimeService, TheaterService ],
	templateUrl: './book-movie.component.html',
	styleUrls: ['./book-movie.component.css']
})
export class BookMovieComponent implements OnInit {
	//Forms
	bookMovieForm: FormGroup;


	//
	movieId : string;
	movie: Movie;
	recMovies: Movie[];
	showtimes: Showtime[];
	genre: Genre;

	theaterDefault: boolean = false;
	timeDefault: boolean = false;

	// for booking
	dates: Date[] = [];
	times: string[] = [];
	theaters: Theater[] = [];

	haveDates: boolean = false;
	haveTimes: boolean = false;

	chosenDate: Date;
	chosenTime: string;
	chosenTheater: Theater;

	constructor(private router: ActivatedRoute,
		private route: Router,
		private movieService: MovieService,
		private showtimeService: ShowtimeService,
		private theaterService: TheaterService) { }

		ngOnInit() {
			this.movieId = this.router.snapshot.params['movieId'];
			this.getMovies();
			this.getUniqueDatesByMovieId(this.movieId);
			// form
			this.bookMovieForm = new FormGroup({
				'date': new FormControl('', [
					Validators.required
				]),
				'time': new FormControl('', [
					Validators.required
				]),
				'theater': new FormControl('', [
					Validators.required
				])
			});

			// for update movieId on same route
			this.router.params.subscribe(
			params => {
				this.movieId = params['movieId'].toString();
				this.getMovies();
				this.dates = [];
				this.getUniqueDatesByMovieId(this.movieId);
			}
		);
	}

	getMovies(): void{
		this.movieService.getMoviesByMovieId(this.movieId)
		.subscribe(
			(movie : Movie) => {
				this.movie = movie;
				this.genre = movie.genre;
				this.getRecMoviesByGenreId(this.genre.genre_id.toString());
			},
			(error) => console.log(error)
		);
	}

	getRecMoviesByGenreId(genreId: string): void {
		this.movieService.getAvaiMoviesByShowtimeAndGenreId(genreId)
		.subscribe(
			(movies: Movie[]) => {
				this.recMovies = movies
				.filter(movie => movie.movieId.toString() !== this.movieId);
				// console.log(this.recMovies);
			},
			(error) => console.log(error)
		);
	}

	getUniqueDatesByMovieId(movieId: string): void {
		this.showtimeService.getShowtimesByMovieId(this.movieId)
		.subscribe(
			(showTimes: Showtime[]) => {
				// this.dates = Array.from(new Set(showTimes));
				for (let i = 0; i < showTimes.length; i++){
				this.dates.push(showTimes[i].date);
			}
			this.dates = Array.from(new Set(this.dates));
			// console.log(this.dates);
		},
		(error) => console.log(error)
	);
}

getUniqueTimesByMovieIdAndDate(movieId: string, date: Date){
	this.times = [];
	this.showtimeService.getShowtimesByMovieIdAndDate(movieId, date)
	.subscribe(
		(Showtimes: Showtime[]) => {
			for (let i = 0; i < Showtimes.length; i++){
				this.times.push(Showtimes[i].slot);
			}
			this.times = Array.from(new Set(this.times));
		},
		(error) => console.log(error)
	)
}

getUniqueTheatersByMovieIdAndDateAndTime(movieId: string, date: Date, time: string){
	this.theaters = [];
	this.showtimeService.getShowTimeByMovieIdAndDateAndTime(movieId,date,time)
	.subscribe(
		(showtimes: Showtime[]) => {
			for (let i = 0; i < showtimes.length; i++){
				this.theaterService.getTheatersById(showtimes[i].theaterId)
					.subscribe(theater => this.theaters.push(theater));
			}
		},
		(error) => console.log(error)
	)
}

// on selected dropbox

onDateSelected(date: Date){
	this.haveDates = true;
	this.chosenDate = date;
	this.theaterDefault = true;
	this.timeDefault = true;
	this.getUniqueTimesByMovieIdAndDate(this.movieId,date);
}

onTimeSelected(time: string){
	this.haveTimes = true;
	this.chosenTime = time;
	this.getUniqueTheatersByMovieIdAndDateAndTime(this.movieId,this.chosenDate,time);
}

//on submit
onSubmit(){
	// console.log(this.bookMovieForm);

	this.route.navigate(['/book-movie/seats',
		this.movieId,
		this.bookMovieForm.get("theater").value,
		this.bookMovieForm.get("time").value,
		this.bookMovieForm.get("date").value]);
}
}
