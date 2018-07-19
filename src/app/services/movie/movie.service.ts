import { Injectable }    from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

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

	getMoviesByMovieId(movieId: string): Observable<Movie>{
		const url = `${this.movieUrl}/${'movie/'}` + movieId;
		return this.http.get<Movie>(url)
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
}
