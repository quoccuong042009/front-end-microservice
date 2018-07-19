import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Order } from '../../../models/order';
import { Movie } from '../../../models/movie';
import { Showtime } from '../../../models/showtime';
import { OrderDetail } from '../../../models/orderDetail';

import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-order-pannel',
  templateUrl: './order-pannel.component.html',
  styleUrls: ['./order-pannel.component.css']
})
export class OrderPannelComponent implements OnInit, OnChanges {
	@Input() curOrders: Order[];
	orderDetails: OrderDetail[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {

  }

	ngOnChanges(){
		this.getOrderDetailbyOrders(this.curOrders);
	}
	getOrderDetailbyOrders(order: Order[]){
		this.orderService.getOrderDetailbyOrders(order)
			.subscribe(orderDetails =>  this.orderDetails = orderDetails);
	}
}
