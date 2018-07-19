import { Component, OnInit } from '@angular/core';

import { Movie } from '../models/movie';

import { MovieService } from '../services/movie/movie.service';

@Component({
  selector: 'app-front-section',
  templateUrl: './front-section.component.html',
	providers: [ MovieService ],
  styleUrls: ['./front-section.component.css']
})
export class FrontSectionComponent implements OnInit {
	movies: Movie[];
	selectedItem: string;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
		this.selectedItem = 'item1';
		this.getAllMovies();
  }

	getAllMovies(): void {
		this.movieService.getMovies()
		.subscribe(
			(movies) => this.movies = movies,
			(error) => console.log(error)
		);
	}

	getMovieByGenre(id: string): void{
		this.movieService.getMoviesByGenreId(id)
			.subscribe(
				(movies) => this.movies = movies,
				(error) => console.log(error)
			);
	}

}
