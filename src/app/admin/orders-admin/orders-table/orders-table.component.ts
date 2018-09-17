import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Order } from '../../../models/order';
import { OrderDetail } from '../../../models/orderDetail';

import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent implements OnInit, OnChanges {
	@Input() orders: Order[];
	orderDetails: OrderDetail[] = [];

  constructor(private orderService: OrderService,
							private route: Router) { }

  ngOnInit() {
  }

	ngOnChanges(){
		this.getOrderDetailbyOrders(this.orders);
	}

	getOrderDetailbyOrders(order: Order[]){
		this.orderService.getOrderDetailbyOrders(order)
			.subscribe(orderDetails =>  this.orderDetails = orderDetails);
	}

	onDisable(orderId: string){
		let tempOrder: Order;
		for(let i = 0; i < this.orders.length ;i++){
			if(this.orders[i].orderId === orderId){
				tempOrder = this.orders[i];
				break;
			}
		}

		this.orderService.disableOrEnableOrder(tempOrder,2)
			.subscribe(
				() => {},
				error => console.log(error)
			);

			window.location.reload();
	}

	onEnable(orderId: string){
		let tempOrder: Order;
		for(let i = 0; i < this.orders.length ;i++){
			if(this.orders[i].orderId === orderId){
				tempOrder = this.orders[i];
				break;
			}
		}

		this.orderService.disableOrEnableOrder(tempOrder,1)
			.subscribe(
				() => {window.location.reload();},
				error => console.log(error)
			);
			window.location.reload();
	}

	isDisable(status: string){
		if(status === 'DISABLE')
			return true;
		else
			return false;
	}
}
