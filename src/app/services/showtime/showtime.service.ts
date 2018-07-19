import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Showtime } from '../../models/showtime';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {
	private showtimeUrl = 'http://localhost:8765/showtime-service';
  constructor(private http: HttpClient) { }

	getShowtimeByShowtimeId(showtimeId: string){
		const url = `${this.showtimeUrl}/${'showtime/'}` + showtimeId;
		return this.http.get<Showtime>(url);
	}

	getShowtimesByMovieId(movieId: string){
		const url = `${this.showtimeUrl}/${'showtimes/movieId/'}` + movieId;
		return this.http.get<Showtime[]>(url);
	}

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
}
