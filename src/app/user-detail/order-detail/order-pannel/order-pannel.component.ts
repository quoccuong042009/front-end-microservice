import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Order } from '../../../models/order';
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

	onCancel(orderId: string){
		let tempOrder: Order;
		for(let i = 0; i < this.curOrders.length ;i++){
			if(this.curOrders[i].orderId === orderId){
				tempOrder = this.curOrders[i];
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

	isDisable(status: string){
		if(status === 'DISABLE')
			return true;
		else
			return false;
	}
}
