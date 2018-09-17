import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { IMyDrpOptions } from 'mydaterangepicker';

import { ActivatedRoute, Router } from '@angular/router';

import { MovieService } from '../../../services/movie/movie.service';
import { Movie } from '../../../models/movie';
import { Genre } from '../../../models/genre';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
	genreOptions: Genre[] = [];
	selectedPicUrl: string = '';
	selectedGenre: number;
	invalidLengTitle: boolean;
	invalidLengDes: boolean;
	invalidFile: boolean;
	invalidDate: boolean;

	myDateRangePickerOptions: IMyDrpOptions = {
  	dateFormat: 'yyyy.mm.dd',
  };
	private dateRangePicked: any;

	addMovieForm: FormGroup;

  constructor(private movieService: MovieService,
							private route: Router,
							private router: ActivatedRoute,
							private fb: FormBuilder) { }

  ngOnInit() {
		this.getGenres();

		this.addMovieForm = this.fb.group({
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
		this.selectedGenre = 1;
		this.movieService.getGenres()
			.subscribe(genres => this.genreOptions = genres);
	}

	onSubmit(){
		this.invalidLengTitle = false;
		this.invalidLengDes = false;
		this.invalidFile = false;
		this.invalidDate = false;
		if(!this.addMovieForm.valid){
			if(!this.addMovieForm.get('description').valid){
				this.invalidLengDes = true;
			}
			if(!this.addMovieForm.get('title').valid){
				this.invalidLengTitle = true;
			}
			if(!this.addMovieForm.get('file').valid){
				this.invalidFile = true;
			}
			if(!this.addMovieForm.get('myDateRange').valid){
				this.invalidDate = true;
			}
		}
		else {
			let movieTitle = this.addMovieForm.get('title').value.toString();
			let description = this.addMovieForm.get('description').value.toString();
			let startDateString = this.addMovieForm.get('myDateRange').value.beginDate.year
				+ '-' + this.addMovieForm.get('myDateRange').value.beginDate.month
				+ '-' + this.addMovieForm.get('myDateRange').value.beginDate.day;
			let endDateString = this.addMovieForm.get('myDateRange').value.endDate.year
				+ '-' + this.addMovieForm.get('myDateRange').value.endDate.month
				+ '-' + this.addMovieForm.get('myDateRange').value.endDate.day;
			let genreId = this.addMovieForm.get('genre').value.toString();
			let startDate = new Date(startDateString);
			let endDate = new Date(endDateString);
			this.movieService.getGenreByGenreId(genreId)
				.subscribe(genre => {
					this.movieService.createMovie(movieTitle, description, genre, startDate, endDate, this.addMovieForm.get('file').value.toString())
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
		this.addMovieForm.patchValue({
			file: picUrl
	 });
  }

	onBack(){
		this.route.navigate(['/admin/movie-admin']);
	}
}
