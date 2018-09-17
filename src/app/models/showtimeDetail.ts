import { Genre } from "../models/genre"
import { Status } from "../models/status"

export class ShowtimeDetail {
	showtimeId: string;
	movieTitle: string;
	theaterName: string;
	genre: Genre;
	slot: string;
	date: Date;
	status: Status;
}
