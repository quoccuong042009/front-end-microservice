import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Theater } from '../../models/theater';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {
	private theaterUrl = 'http://localhost:8765/theater-service';
	constructor(private http: HttpClient) { }

	getTheatersById(theaterId: string){
		const url = `${this.theaterUrl}/${'theater/'}` + theaterId;
		return this.http.get<Theater>(url);
	}
}
