import { Component, OnInit } from '@angular/core';
import { IMyDrpOptions } from 'mydaterangepicker';

import { Order } from '../../models/order';
import { OrderService } from '../../services/order/order.service';
import { UserService } from '../../services/user/user.service';
import { ShareService } from '../../services/share/share.service';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css']
})
export class OrdersAdminComponent implements OnInit {
	inputEmail:string = null;
	regexp = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/);
	invalidEmail: boolean;
	orders: Order[] = [];

	myDateRangePickerOptions: IMyDrpOptions = {
		dateFormat: 'yyyy.mm.dd',
	};

	private dateRangePicked: any = null;

  constructor(private orderService: OrderService,
							private userService: UserService,
							private shareService: ShareService) { }

  ngOnInit() {
		this.shareService.emitChange('item1');
		this.getOrders();
  }

	getOrders(){
		this.orderService.getAllOrders()
			.subscribe(orders => this.orders = orders);
	}

	onSubmit(){
		this.invalidEmail = false;

		if((this.inputEmail !== null && this.inputEmail !== '') && this.dateRangePicked != null){
			let startDate = this.dateRangePicked.beginDate.year + '-' + this.dateRangePicked.beginDate.month + '-' + this.dateRangePicked.beginDate.day;
			let endDate = this.dateRangePicked.endDate.year + '-' + this.dateRangePicked.endDate.month + '-' + this.dateRangePicked.endDate.day;

			// console.log(this.inputEmail);
			// console.log(startDate);
			// console.log(endDate);

			this.userService.getUserByEmail(this.inputEmail)
				.subscribe(user => {
					this.orderService.getOrderByDateRage(user.userId.toString(),startDate, endDate)
						.subscribe(orders => this.orders = orders);
				})
		}
		else {
			if(this.inputEmail !== null && this.inputEmail !== ''){
				if(this.regexp.test(this.inputEmail)){
					this.orderService.getOrderByUserEmail(this.inputEmail)
						.subscribe(orders => this.orders = orders);
					}
					else {
						this.invalidEmail = true;
					}
				}

				if(this.dateRangePicked != null){
					let startDate = this.dateRangePicked.beginDate.year + '-' + this.dateRangePicked.beginDate.month + '-' + this.dateRangePicked.beginDate.day;
					let endDate = this.dateRangePicked.endDate.year + '-' + this.dateRangePicked.endDate.month + '-' + this.dateRangePicked.endDate.day;

					this.orderService.getOrderByRangeDateWithoutUserId(startDate,endDate)
					.subscribe(orders => {
						console.log(orders);
						this.orders = orders});
					}
			}
	}

	isDisable(){
		return (this.inputEmail === null || this.inputEmail === '') && this.dateRangePicked === null;
	}


}
