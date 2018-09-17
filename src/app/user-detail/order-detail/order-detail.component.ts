import { Component, OnInit } from '@angular/core';
import { IMyDrpOptions } from 'mydaterangepicker';

import { User } from '../../models/user';
import { Order } from '../../models/order';
import { Movie } from '../../models/movie';
import { Showtime } from '../../models/showtime';
import { Genre } from '../../models/genre';

import { UserService } from '../../services/user/user.service';
import { MovieService } from '../../services/movie/movie.service';
import { OrderService } from '../../services/order/order.service';
import { ShareService } from '../../services/share/share.service';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
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
							private shareService: ShareService) { }

  ngOnInit() {
		this.shareService.emitChange('item1');
		this.getGenres();
		this.getUser();
  }

	//onInit function
	getGenres(){
		this.movieService.getGenres()
			.subscribe(genres => this.genreOptions = genres);
	}

	getUser(){
		this.userService.getUser()
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
}
