import { Injectable } from '@angular/core';
import { Response, Headers  } from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Theater } from '../../models/theater';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {
	private theaterUrl = 'http://localhost:8765/theater-service';
	constructor(private http: HttpClient) { }

	getAllTheater(){
		const url = `${this.theaterUrl}/${'theaters'}`;
		return this.http.get<Theater[]>(url);
	}

	getTheatersById(theaterId: string){
		const url = `${this.theaterUrl}/${'theater/'}` + theaterId;
		return this.http.get<Theater>(url);
	}

	createTheater(name: string){
		const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
            // 'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
        })
    };

		const url = `${this.theaterUrl}/${'theater/add'}`;
		let body = {
			"name": name
		};
		return this.http.post<Theater>(url, body,httpOptions);
	}

	editTheater(theaterId: string, name: string){

		const url = `${this.theaterUrl}/${'theater/edit/'}` + theaterId;
		let body = {
			"theaterId": theaterId,
			"name": name
		};
		return this.http.put(url, body,{
        headers: new HttpHeaders({
					'Content-Type': 'application/json',
					// 'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
				}),
        responseType: 'text'
     });
	}
}
