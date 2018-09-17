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

	getAllOrders(){
		const url = `${this.orderUrl}/${'orders'}`;
		return this.http.get<Order[]>(url);
	}

	getOrdersByShowtimeId(showtimeId: string){
		const url = `${this.orderUrl}/${'orders/showtime/'}` + showtimeId;
		return this.http.get<Order[]>(url);
	}

	getOrderByUserId(userId: string): Observable<Order[]>{
		const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
        })
    };
		const url = `${this.orderUrl}/${'protected/orders/user-id/'}` + userId;
		return this.http.get<Order[]>(url);
	}

	getOrderByUserEmail(email: string): Observable<Order[]>{
		const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
            // 'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
        })
    };
		const url = `${this.orderUrl}/${'protected/orders/user-email/'}` + email;
		return this.http.get<Order[]>(url,httpOptions);
	}

	createOrder(userId: string, showtimeId: string, seats: string){
		const url = `${this.orderUrl}/${'protected/create-order'}`;
		const body = {
			"userId": userId,
			"showtimeId": showtimeId,
			"seats": seats,
			"statusId": {
					"statusID": 1,
					"status": "ENABLE"
			}
    };
		return this.http.post(url,body,{
        headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
				}),
        responseType: 'text'
     });
	}

	disableOrEnableOrder(order: Order, status: number){
		const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
            // 'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
        })
    };
		let body;

		if(status === 1){
			body = {
				"orderId": order.orderId,
				"userId": order.userId,
				"showtimeId": order.showtimeId,
				"seats": order.seats,
				"statusId": {
						"statusID": 1,
						"status": "ENABLE"
				}
	    };
		}
		else{
			body = {
				"orderId": order.orderId,
				"userId": order.userId,
				"showtimeId": order.showtimeId,
				"seats": order.seats,
				"statusId": {
						"statusID": 2,
						"status": "DISABLE"
				}
	    };
		}

		const url = `${this.orderUrl}/${'protected/order/cancel-order'}`;
		console.log(body);
		return this.http.put(url,body,httpOptions);
	}
	//======================ORDER SEARCH BY USER==========================================
	getOrdersByGenre(userId:string, genreId: string){
		const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
        })
    };

		const url = `${this.orderUrl}/${'protected/orders/genre/'}` + userId + `/` + genreId;

		return this.http.get<Order[]>(url,httpOptions);
	}

	getOrdersByMovieTitle(userId:string, movieTitle: string){
		const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
        })
    };

		const url = `${this.orderUrl}/${'protected/orders/movie-title/'}` + userId + `/` + movieTitle;

		return this.http.get<Order[]>(url,httpOptions);
	}

	getOrderByDateRage(userId:string, startDate: string, endDate: string){
		const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
        })
    };

		const url = `${this.orderUrl}/${'protected/orders/range-date/'}` + userId + `/` + startDate + `/` + endDate;

		return this.http.get<Order[]>(url,httpOptions);
	}

	getOrderByRangeDateWithoutUserId(startDate: string, endDate: string){
		const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
        })
    };

		const url = `${this.orderUrl}/${'protected/orders/date/'}` + startDate + `/` + endDate;

		return this.http.get<Order[]>(url,httpOptions);
	}


	//======================ORDER DETAIL==========================================

	// getOrderDetailbyOrderId(orderId: string){
	// 	const url = `${this.orderUrl}/${'protected/orderdetail/'}` + orderId;
	// 	return this.http.get<OrderDetail>(url);
	// }

	getOrderDetailbyOrders(orders: Order[]){
		const httpOptions = {
				headers: new HttpHeaders({
						'Content-Type': 'application/json'
						// 'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
				})
		};
		const url = `${this.orderUrl}/${'protected/orderdetail'}` ;
		return this.http.post<OrderDetail[]>(url,JSON.stringify(orders),httpOptions);
	}
}
