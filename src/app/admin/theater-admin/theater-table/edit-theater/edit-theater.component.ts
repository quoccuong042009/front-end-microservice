import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { TheaterService } from '../../../../services/theater/theater.service';

@Component({
  selector: 'app-edit-theater',
  templateUrl: './edit-theater.component.html',
  styleUrls: ['./edit-theater.component.css']
})
export class EditTheaterComponent implements OnInit {
	selectedName: string = '';

  constructor(private theaterService: TheaterService,
							private route: Router,
							private router: ActivatedRoute,) { }

  ngOnInit() {
		this.theaterService.getTheatersById(this.router.snapshot.params['theaterId'])
			.subscribe(theater => this.selectedName = theater.name);
  }

	onSubmit(){
		this.theaterService.editTheater(this.router.snapshot.params['theaterId'], this.selectedName)
			.subscribe(
				() => {this.onBack()}
			)
	}

	onBack(){
		this.route.navigate(['/admin/theater-admin']);
	}
}
