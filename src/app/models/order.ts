import { Status } from "../models/status"

export class Order {
	orderId: string;
	userId: string;
	showtimeId: string;
	seats: string;
	status: Status;
}
