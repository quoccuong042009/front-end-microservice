import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';

import { TOKEN_NAME } from '../user/auth.constant';
import { Order } from '../../models/order';
import { OrderDetail } from '../../models/orderDetail';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
	private orderUrl = 'http://localhost:8765/order-service';

  constructor(private http: HttpClient,
							private cookieService: CookieService) { }

	getOrdersByShowtimeId(showtimeId: string){
		const url = `${this.orderUrl}/${'orders/'}` + showtimeId;
		return this.http.get<Order[]>(url);
	}

	getOrderByUserId(userId: string): Observable<Order[]>{
		const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
        })
    };
		const url = `${this.orderUrl}/${'protected/orders/'}` + userId;
		return this.http.get<Order[]>(url);
	}

	createOrder(userId: string, showtimeId: string, seats: string){
		const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
        })
    };
		const url = `${this.orderUrl}/${'/protected/create-order'}`;
		const body = {
			"userId": userId,
			"showtimeId": showtimeId,
			"seats": seats,
			"statusId": {
					"statusID": 1,
					"status": "ENABLE"
			}
    };
		return this.http.post(url,body,httpOptions);
	}

	getOrdersByGenre(genreId: string){

	}

	getOrdersByMovieTitle(movieTitle: string){

	}

	getOrderByDateRage(startDate: Date, endDate: Date){
		
	}
	//======================ORDER DETAIL==========================================

	// getOrderDetailbyOrderId(orderId: string){
	// 	const url = `${this.orderUrl}/${'protected/orderdetail/'}` + orderId;
	// 	return this.http.get<OrderDetail>(url);
	// }

	getOrderDetailbyOrders(orders: Order[]){
		const httpOptions = {
				headers: new HttpHeaders({
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
				})
		};
		const url = `${this.orderUrl}/${'protected/orderdetail'}` ;
		return this.http.post<OrderDetail[]>(url,JSON.stringify(orders),httpOptions);
	}
}
