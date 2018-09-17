import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { MovieService } from '../../../../services/movie/movie.service';
import { Movie } from '../../../../models/movie';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.css']
})
export class DetailMovieComponent implements OnInit {
	movie: Movie;

  constructor(private movieService: MovieService,
							private router: ActivatedRoute) { }

  ngOnInit() {
		this.getMoviesByMovieId(this.router.snapshot.params['movieId']);
  }

	getMoviesByMovieId(movieId: string){
		this.movieService.getMoviesByMovieId(movieId)
			.subscribe(movie => this.movie = movie);
	}
}
