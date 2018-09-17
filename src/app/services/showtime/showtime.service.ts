import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Showtime } from '../../models/showtime';
import { ShowtimeDetail } from '../../models/showtimeDetail';

@Injectable({
	providedIn: 'root'
})
export class ShowtimeService {
	private showtimeUrl = 'http://localhost:8765/showtime-service';
	constructor(private http: HttpClient) { }

	getAllShowtimes(){
		const url = `${this.showtimeUrl}/${'showtimes'}`;
		return this.http.get<Showtime[]>(url);
	}

	getShowtimeByShowtimeId(showtimeId: string){
		const url = `${this.showtimeUrl}/${'showtime/'}` + showtimeId;
		return this.http.get<Showtime>(url);
	}

	getShowtimesByMovieId(movieId: string){
		const url = `${this.showtimeUrl}/${'showtimes/movieId/'}` + movieId;
		return this.http.get<Showtime[]>(url);
	}

	getShowtimesByGenreId(genreId: string){
		const url = `${this.showtimeUrl}/${'showtimes/genre/'}` + genreId;
		return this.http.get<Showtime[]>(url);
	}

	getShowtimesByRangeDate(startDate: string, endDate: string){
		const url = `${this.showtimeUrl}/${'showtimes/range-date/'}` + startDate + '/' + endDate;
		return this.http.get<Showtime[]>(url);
	}

	//=================FOR BOOKING========================
	getShowtimesByMovieIdAndDate(movieId: string, date: Date){
		const url = `${this.showtimeUrl}/${'showtimes/slots/'}` + movieId + '/' + date.toString();
		// console.log(url);
		return this.http.get<Showtime[]>(url);
	}

	getShowTimeByMovieIdAndDateAndTime(movieId: string, date: Date, time: string){
		const url = `${this.showtimeUrl}/${'showtimes/theaters/'}` + movieId + '/' + date.toString() + '/' + time;
		// console.log(url);
		return this.http.get<Showtime[]>(url);
	}

	getShowtimeByRest(movieId: string, theaterId: string, time: string, date: Date){
		const url = `${this.showtimeUrl}/${'showtime/'}` + movieId + '/' + theaterId + '/' + time + '/' + date.toString();
		return this.http.get<Showtime>(url);
	}

	//==============ADMIN=========================
	getShowtimeDetailByShowtimes(showtimes: Showtime[]){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
				// 'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
			})
		};
		const url = `${this.showtimeUrl}/${'showtimes/showtimedetail'}`;
		return this.http.post<ShowtimeDetail[]>(url,JSON.stringify(showtimes),httpOptions);
	}

	getAvailableTimeWithDateAndTheater(theaterId: string, date: string){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
				// 'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
			})
		};
		const url = `${this.showtimeUrl}/${'showtimes/'}` + theaterId + '/' + date;
		return this.http.get<string[]>(url,httpOptions);
	}

	add(movieId: string, theaterId: string, time: string, date: Date){
		let body = {
        movieId: movieId,
        theaterId: theaterId,
        slot: time,
        date: date,
				status: {
            statusID: 1,
            status: 'ENABLE'
        }
    }

		const url = `${this.showtimeUrl}/${'showtime/add'}`;
		return this.http.post(url, body,{
        headers: new HttpHeaders({
					'Content-Type': 'application/json',
					// 'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
				}),
        responseType: 'text'
     });
	}

	disableShowtime(showtime: Showtime){
		const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
            // 'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
        })
    };
		let body = {
			"showtimeId": showtime.showtimeId,
      "movieId": showtime.movieId,
      "theaterId": showtime.theaterId,
      "slot": showtime.slot,
      "date": showtime.date,
      "status": {
          "statusID": 2,
          "status": "DISABLE"
      }
		}


		const url = `${this.showtimeUrl}/${'showtime/disable'}`;
		return this.http.put(url,body,{
        headers: new HttpHeaders({
					'Content-Type': 'application/json',
					// 'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
				}),
        responseType: 'text'
     });
	}
}
