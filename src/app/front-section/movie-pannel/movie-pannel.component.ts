import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../models/movie';



@Component({
  selector: 'app-movie-pannel',
  templateUrl: './movie-pannel.component.html',
  styleUrls: ['./movie-pannel.component.css']
})
export class MoviePannelComponent implements OnInit {
	@Input() movies: Movie[];

  constructor() { }

  ngOnInit() {

  }


}
