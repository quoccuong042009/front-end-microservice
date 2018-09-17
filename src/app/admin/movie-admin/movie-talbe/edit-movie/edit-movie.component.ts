import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IMyDrpOptions } from 'mydaterangepicker';

import { ActivatedRoute, Router } from '@angular/router';

import { MovieService } from '../../../../services/movie/movie.service';
import { Movie } from '../../../../models/movie';
import { Genre } from '../../../../models/genre';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
	movie: Movie;
	genreOptions: Genre[] = [];
	selectedDescription: string;
	selectedTitle: string;
	selectedGenre: number;
	selectedPicUrl: string;

	invalidLengTitle: boolean;
	invalidLengDes: boolean;

	myDateRangePickerOptions: IMyDrpOptions = {
  	dateFormat: 'yyyy.mm.dd',
  };

	editMovieForm: FormGroup;

  constructor(private movieService: MovieService,
							private route: Router,
							private router: ActivatedRoute,
							private fb: FormBuilder,
							private cd: ChangeDetectorRef) { }

  ngOnInit() {
		this.getMoviesByMovieId(this.router.snapshot.params['movieId']);
		this.getGenres();

		this.editMovieForm = this.fb.group({
			title: new FormControl('', [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(100)
			]),
			description: new FormControl('', [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(600)
			]),
			file: [null, Validators.required],
			genre: new FormControl('', [
				Validators.required
			]),
			myDateRange: ['', Validators.required]
		});
  }

	getGenres(){
		this.movieService.getGenres()
			.subscribe(genres => this.genreOptions = genres);
	}

	getMoviesByMovieId(movieId: string){
		this.movieService.getMoviesByMovieId(movieId)
			.subscribe(movie => {
				this.movie = movie;
				this.selectedTitle = this.movie.movieTitle;
				this.selectedGenre = this.movie.genre.genre_id;
				this.selectedPicUrl = this.movie.picUrl;
				this.selectedDescription = this.movie.description;
			});
	}

	onSubmit(){
		this.invalidLengTitle = false;
		this.invalidLengDes = false;
		// console.log(this.editMovieForm);
		if(!this.editMovieForm.valid){
			if(!this.editMovieForm.get('description').valid){
				this.invalidLengDes = true;
			}
			if(!this.editMovieForm.get('title').valid){
				this.invalidLengTitle = true;
			}
		}
		else {
			let movieId = this.router.snapshot.params['movieId'];
			let movieTitle = this.editMovieForm.get('title').value.toString();
			let description = this.editMovieForm.get('description').value.toString();
			let startDateString = this.editMovieForm.get('myDateRange').value.beginDate.year
				+ '-' + this.editMovieForm.get('myDateRange').value.beginDate.month
				+ '-' + this.editMovieForm.get('myDateRange').value.beginDate.day;
			let endDateString = this.editMovieForm.get('myDateRange').value.endDate.year
				+ '-' + this.editMovieForm.get('myDateRange').value.endDate.month
				+ '-' + this.editMovieForm.get('myDateRange').value.endDate.day;
			let genreId = this.editMovieForm.get('genre').value.toString();
			let startDate = new Date(startDateString);
			let endDate = new Date(endDateString);

			console.log(this.editMovieForm.get('file').value.toString());
			this.movieService.getGenreByGenreId(genreId)
				.subscribe(genre => {
					this.movieService.editMovie(movieId, movieTitle, description, genre, startDate, endDate, this.editMovieForm.get('file').value.toString())
						.subscribe(
							() => {this.onBack();}
						)
				})
		}
	}

	onFileChange(event) {
		let file = event.target.files;
		let fileName = file[0].name;
		let picUrl = 'assets/images/' + fileName;
		this.selectedPicUrl = picUrl;
		this.editMovieForm.patchValue({
			file: picUrl
	 });
  }

	onBack(){
		this.route.navigate(['/admin/movie-admin']);
	}
}
