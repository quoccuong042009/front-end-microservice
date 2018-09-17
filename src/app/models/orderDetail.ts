import { Status } from "../models/status"

export class OrderDetail {
	orderId: number;
	email: string;
	movieTitle: string;
	genre: string;
	date: Date;
	theater: string;
	time: string;
	seat: string;
	status: Status;
}
