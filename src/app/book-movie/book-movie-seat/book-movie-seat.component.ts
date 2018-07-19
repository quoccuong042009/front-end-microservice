import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { MovieService } from '../../services/movie/movie.service';
import { ShowtimeService } from '../../services/showtime/showtime.service';
import { TheaterService } from '../../services/theater/theater.service';
import { OrderService } from '../../services/order/order.service';
import { UserService } from '../../services/user/user.service';

import { User } from '../../models/user';
import { Movie } from '../../models/movie';
import { Showtime } from '../../models/showtime';
import { Theater } from '../../models/theater';
import { Order } from '../../models/order';
import { Seat } from '../../models/seat';

@Component({
  selector: 'app-book-movie-seat',
	providers: [ MovieService, ShowtimeService, TheaterService, OrderService],
  templateUrl: './book-movie-seat.component.html',
  styleUrls: ['./book-movie-seat.component.css']
})
export class BookMovieSeatComponent implements OnInit {
	NUMSEAT: number = 40;

	movieId: string;
	date: Date;
	time: string;
	theaterId: string;

	curMovie: Movie;
	curShowtime: Showtime;
	curTheater: Theater;
	availableSeat: number[]= [];
	seatsManager: Seat[]= [];

	selectedSeat: Seat[]= [];
	invalidNumberOfSeats: boolean = false;

	state: RouterStateSnapshot;

  constructor(
		private router: ActivatedRoute,
    private route: Router,
		private fb: FormBuilder,
		private movieService: MovieService,
		private showtimeService: ShowtimeService,
		private theaterService: TheaterService,
		private orderService: OrderService,
		private userService: UserService) { }

  ngOnInit() {
		for(let i = 1; i <= this.NUMSEAT;i++){
			this.availableSeat.push(i);
		}

		this.movieId = this.router.snapshot.params['movieId'];
    this.theaterId = this.router.snapshot.params['theaterId'];
		this.time = this.router.snapshot.params['time'];
    this.date = this.router.snapshot.params['date'];
		this.getMovie();
		this.getTheater();
		this.getShowtime();
  }

	getMovie(){
		this.movieService.getMoviesByMovieId(this.movieId)
			.subscribe(movie => this.curMovie = movie);
	}

	getShowtime(){
		this.showtimeService.getShowtimeByRest(this.movieId, this.theaterId, this.time, this.date)
			.subscribe(
				(showtime: Showtime) => {
					this.curShowtime = showtime;
					this.getCurAvaiSeatsByShowtimeId(this.curShowtime.showtimeId);
				},
				(error) => console.log(error)
			);
	}

	getTheater(){
		this.theaterService.getTheatersById(this.theaterId)
			.subscribe(theater => this.curTheater = theater);
	}

	getCurAvaiSeatsByShowtimeId(showtimeId: string){
		this.orderService.getOrdersByShowtimeId(showtimeId)
			.subscribe(
				(orders: Order[]) => {
					for(let i = 0; i < orders.length; i++){
						let seatArray = this.stringToNumberArray(orders[i].seats);
						this.availableSeat = this.availableSeat.filter(item => seatArray.indexOf(item) < 0);
					}
					console.log(this.availableSeat);

					for(let i = 1, j = 1; i <= this.NUMSEAT;i++){
						let tempSeat: Seat = new Seat();

						tempSeat.seatNumber = i;

						if(i == this.availableSeat[j]){
							tempSeat.disabled = false;
							j++;
						}
						else {
							tempSeat.disabled = true;
						}

						this.seatsManager.push(tempSeat);
					}
				},
				(error) => console.log(error)
			)
	}

	stringToNumberArray(s: string){
		let sArray = s.split(',');

		let res: number[] = [];
		for(let i = 0; i < sArray.length ; i++){
			res.push(Number(sArray[i]));
		}

		return res;
	}

	updateChecked(option, event) {
			if(this.selectedSeat.indexOf(option) === -1){
				this.selectedSeat.push(option);
			}
			else {
				this.selectedSeat = this.selectedSeat.filter(seat => seat !== option);
			}
	}

	onSubmit(){
		if(this.selectedSeat.length > 5){
			this.invalidNumberOfSeats = true;
		}
		else{
			if(this.userService.isLoggedIn()){
				let curUser: User;
				this.userService.getUser()
					.subscribe(user => curUser = user);
				this.orderService.createOrder(curUser.userId.toString(), this.curShowtime.showtimeId, this.selectedSeat.toString())
					.subscribe(
						(response: Response) => {
							if(response.status === 200){
								//success page
							}
						}
					);
			}
			else{
				this.route.navigate(['login'], {queryParams: {redirectTo: this.state.url}});
			}
		}
	}

}
