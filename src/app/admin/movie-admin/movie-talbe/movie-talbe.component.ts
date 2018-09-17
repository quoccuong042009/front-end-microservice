import { Component, OnInit, Input } from '@angular/core';

import { Movie } from '../../../models/movie';

@Component({
  selector: 'app-movie-talbe',
  templateUrl: './movie-talbe.component.html',
  styleUrls: ['./movie-talbe.component.css']
})
export class MovieTalbeComponent implements OnInit {
	@Input() movies: Movie[];
  constructor() { }

  ngOnInit() {
  }

}
