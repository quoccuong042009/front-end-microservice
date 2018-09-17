import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Showtime } from '../../../models/showtime';
import { Movie } from '../../../models/movie';
import { Theater } from '../../../models/theater';

import { ShowtimeService } from '../../../services/showtime/showtime.service';
import { MovieService } from '../../../services/movie/movie.service';
import { TheaterService } from '../../../services/theater/theater.service';

@Component({
  selector: 'app-add-showtime',
  templateUrl: './add-showtime.component.html',
  styleUrls: ['./add-showtime.component.css']
})
export class AddShowtimeComponent implements OnInit {
	movies: Movie[];
	theaters: Theater[];

	fullSlot: boolean = false;
	noMovieAvailable: boolean  = false;
	showAdding: boolean = false;
	availableTime: string[] = [];
	availableMovie: Movie[] = [];

	selectedDate: Date;
	selectedTheaterId: string;

	selectedMovieId: string = '0';
	selectedTime: string = '0';

	public myDatePickerOptions: IMyDpOptions = {
		height: '30px',
    width: '265px',
    dateFormat: 'yyyy.mm.dd',
  };

	addShowtimeForm: FormGroup;

  constructor(private showtimeService: ShowtimeService,
							private movieService: MovieService,
							private theaterService: TheaterService,
							private route: Router,
							private router: ActivatedRoute,
							private fb: FormBuilder) { }

  ngOnInit() {
		this.getMovies();
		this.getTheaters();

		this.addShowtimeForm = this.fb.group({
			myDate: [null, Validators.required],
			theater: new FormControl('', [
				Validators.required
			])
		});
  }

	onSubmit(){
		this.showAdding = false;
		this.fullSlot = false;
		this.noMovieAvailable = false;
		this.availableMovie = [];
		this.availableTime = [];

		let dateString = this.addShowtimeForm.get('myDate').value.date.year
			+ '-' + this.addShowtimeForm.get('myDate').value.date.month
			+ '-' + this.addShowtimeForm.get('myDate').value.date.day;

	 	this.selectedDate= new Date(dateString);
		this.selectedTheaterId = this.addShowtimeForm.get('theater').value.toString();

		this.showtimeService.getAvailableTimeWithDateAndTheater(this.selectedTheaterId, dateString)
			.subscribe(availableTime => {
				console.log(availableTime);
				if(availableTime.length === 0){
					this.fullSlot = true;
				}
				else {
					this.availableTime = availableTime;


					this.movieService.getAvailableMoviesByDate(dateString)
						.subscribe(movies => {
							if(movies.length === 0){
								this.noMovieAvailable = true;
							}
							else{
								this.availableMovie = movies;
								this.showAdding = true;
							}
						});
				}
			})
	}

	onAdd(){
		this.showtimeService.add(this.selectedMovieId, this.selectedTheaterId, this.selectedTime, this.selectedDate)
			.subscribe(res => {
				console.log(res);
				this.route.navigate(['admin']);
			});
	}

	getTheaters(){
		this.theaterService.getAllTheater()
			.subscribe(theaters => this.theaters = theaters);
	}

	getMovies(){
		this.movieService.getMovies()
			.subscribe(movies => this.movies = movies);
	}

	isSelected(){
		if(this.selectedTime !== '0' && this.selectedMovieId !== '0'){
			return true;
		}
		else{
			return false;
		}
	}
}
