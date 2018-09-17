import { Component, OnInit } from '@angular/core';
import { IMyDrpOptions } from 'mydaterangepicker';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../../../models/user';
import { Order } from '../../../../models/order';
import { Movie } from '../../../../models/movie';
import { Showtime } from '../../../../models/showtime';
import { Genre } from '../../../../models/genre';

import { UserService } from '../../../../services/user/user.service';
import { MovieService } from '../../../../services/movie/movie.service';
import { OrderService } from '../../../../services/order/order.service';

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css']
})
export class CustomerOrderComponent implements OnInit {
	curUser: User = new User();
	curOrders: Order[];
	searchOptions: string[] = ['All', 'Genre', 'Movie Title', 'Date']
	genreOptions: Genre[] = [];

	//for sort orders
	selectedGenre: number = 1;
	inputTitle: string = '';

	byAll: boolean = true;
	byGenre: boolean = false;
	byTitle: boolean = false;
	byDate: boolean = false;

	myDateRangePickerOptions: IMyDrpOptions = {
  		dateFormat: 'yyyy.mm.dd',
  };
	private dateRangePicked: any;

	//
  constructor(private movieService: MovieService,
							private userService: UserService,
							private orderService: OrderService,
							private route: Router,
							private router: ActivatedRoute,) { }

  ngOnInit() {
		this.getGenres();
		this.getUser();
  }

	//onInit function
	getGenres(){
		this.movieService.getGenres()
			.subscribe(genres => this.genreOptions = genres);
	}

	getUser(){
		this.userService.getUserByUserId(this.router.snapshot.params['userId'])
			.subscribe(user => {
				this.curUser = user;
				this.getOrders(this.curUser.userId.toString());
			})
	}

	getOrders(userId: string){
		this.orderService.getOrderByUserId(userId)
			.subscribe(orders => this.curOrders = orders);
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
			this.getOrders(this.curUser.userId.toString());
	}

	onSubmitGenre(){
		// console.log(this.selectedGenre);
		this.orderService.getOrdersByGenre(this.curUser.userId.toString(), this.selectedGenre.toString())
			.subscribe(orders => this.curOrders = orders);
	}

	onSubmitTitle(){
		console.log(this.inputTitle);
		this.orderService.getOrdersByMovieTitle(this.curUser.userId.toString(), this.inputTitle)
			.subscribe(orders => this.curOrders = orders);
	}

	onSubmitDateRange(){
		let startDate = this.dateRangePicked.beginDate.year + '-' + this.dateRangePicked.beginDate.month + '-' + this.dateRangePicked.beginDate.day;
		let endDate = this.dateRangePicked.endDate.year + '-' + this.dateRangePicked.endDate.month + '-' + this.dateRangePicked.endDate.day;

		this.orderService.getOrderByDateRage(this.curUser.userId.toString(), startDate, endDate)
			.subscribe(orders => this.curOrders = orders);

	}

	onBack(){
		this.route.navigate(['/admin']);
	}
}
