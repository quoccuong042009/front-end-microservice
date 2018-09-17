import { Component, OnInit, Input } from '@angular/core';

import { Theater } from '../../../models/theater';

@Component({
  selector: 'app-theater-table',
  templateUrl: './theater-table.component.html',
  styleUrls: ['./theater-table.component.css']
})
export class TheaterTableComponent implements OnInit {
	@Input() theaters: Theater[];
  constructor() { }

  ngOnInit() {
  }

}
