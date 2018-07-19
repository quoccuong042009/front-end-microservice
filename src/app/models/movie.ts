import { Genre } from '../models/genre';

export class Movie{
	movieId: number;
	movieTitle: string;
	description: string;
	genre: Genre;
	startDate: Date;
	endDate: Date;
	picUrl: string;
}
