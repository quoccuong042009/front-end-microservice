import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';
import { Order } from '../../models/order';
import { Movie } from '../../models/movie';
import { Showtime } from '../../models/showtime';
import { Genre } from '../../models/genre';

import { UserService } from '../../services/user/user.service';
import { MovieService } from '../../services/movie/movie.service';
import { OrderService } from '../../services/order/order.service';

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

	//
  constructor(private movieService: MovieService,
							private userService: UserService,
							private orderService: OrderService) { }

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
		console.log(this.selectedGenre);
	}

	onSubmitTitle(){
		console.log(this.inputTitle);
	}
}
