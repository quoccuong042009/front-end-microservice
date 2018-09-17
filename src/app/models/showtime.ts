import { Status } from "../models/status"

export class Showtime {
	showtimeId: string;
	movieId: string;
	theaterId: string;
	slot: string;
	date: Date;
	status: Status;
}
