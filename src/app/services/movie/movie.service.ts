import { Injectable }    from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Movie } from '../../models/movie';
import { Genre } from '../../models/genre';

@Injectable({
  providedIn: 'root'
})
export class MovieService{
	private movieUrl = 'http://localhost:8765/movie-service';

	constructor(private http: HttpClient){}

	getMovies(): Observable<Movie[]> {
		const url = `${this.movieUrl}/${'movies'}`;
		return this.http.get<Movie[]>(url);
	}
	getAvaiMoviesByShowtime() {
		const url = `${this.movieUrl}/${'avai-movies'}`;
		return this.http.get<Movie[]>(url);
	}

	getMoviesByMovieId(movieId: string): Observable<Movie>{
		const url = `${this.movieUrl}/${'movie/'}` + movieId;
		return this.http.get<Movie>(url)
	}

	getMoviesByMovieTitle(movieTitle: string) {
		const url = `${this.movieUrl}/${'movie/title/'}` + movieTitle;
		return this.http.get<Movie>(url);
	}

	getMoviesByRangeDate(startDate: string, endDate: string){
		const url = `${this.movieUrl}/${'movies/range-date/'}` + startDate + `/` + endDate;
		return this.http.get<Movie[]>(url);
	}

	//======EDIT AND CREATE MOVIE==========================
	editMovie(movieId: string, movieTitle: string, description: string, genre: Genre, startDate: Date, endDate: Date, picture: string){
		const httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json'
					// 'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
				})
			};

		const url = `${this.movieUrl}/${'admin/movie/edit/'}` + movieId;
		let body = {
			"movieId": movieId,
			"movieTitle": movieTitle,
			"description": description,
			"genre":{
				"genre_id": genre.genre_id,
				"genre": genre.genre
			},
			"startDate": startDate,
			"endDate": endDate,
			"picUrl": picture
		}
		return this.http.put(url,body,httpOptions);
	}

	createMovie(movieTitle: string, description: string, genre: Genre, startDate: Date, endDate: Date,  picture: string){
		let header = new Headers({'Content-Type': 'application/json'});
		const url = `${this.movieUrl}/${'admin/movie/add'}`;

		let body = {
			"movieTitle": movieTitle,
			"description": description,
			"genre":{
				"genre_id": genre.genre_id,
				"genre": genre.genre
			},
			"startDate": startDate,
			"endDate": endDate,
			"picUrl": picture
		}

		return this.http.post(url,body, {
        headers: new HttpHeaders({
					'Content-Type': 'application/json'
					// 'Authorization': 'Bearer ' + this.cookieService.get(TOKEN_NAME)
				}),
        responseType: 'text'
     });
	}

	getAvailableMoviesByDate(date: string){
		const httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json'
				})
			};

		const url = `${this.movieUrl}/${'admin/movies/date/'}` + date;
		return this.http.get<Movie[]>(url,httpOptions);
	}

	getAvaiMoviesByRangeDate(startDate: string, endDate: string){
		const httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json'
				})
			};

		const url = `${this.movieUrl}/${'avai-movies/range-date/'}` + startDate + '/' + endDate;
		return this.http.get<Movie[]>(url,httpOptions);
	}

	//======= GENRE ========================================
	getAvaiMoviesByShowtimeAndGenreId(genreId: string) {
		const url = `${this.movieUrl}/${'avai-movies/genreId/'}` + genreId;
		return this.http.get<Movie[]>(url);
	}
	getMoviesByGenreId(genreId: string): Observable<Movie[]> {
		const url = `${this.movieUrl}/${'movies/genre/'}` + genreId;
		return this.http.get<Movie[]>(url);
	}

	getGenres(): Observable<Genre[]> {
		const url = `${this.movieUrl}/${'genres'}`;
		return this.http.get<Genre[]>(url);
	}

	getGenreByGenreId(genreId: string): Observable<Genre>{
		const url = `${this.movieUrl}/${'genre/'}` + genreId;
		return this.http.get<Genre>(url);
	}

	//=========== FOR ADDING SHOWTIME TABLE ==================
	getNextNDate(n: number){
		const url = `${this.movieUrl}/${'dates/'}` + n;
		return this.http.get<Date[]>(url);
	}

	getAvaiMoviesForNextNdate(n: number){
		const url = `${this.movieUrl}/${'movies/next-date/'}` + n;
		return this.http.get<Movie[][][]>(url);
	}
}
