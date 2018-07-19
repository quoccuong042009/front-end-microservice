import { Status } from "../models/status"
import { Role } from "../models/role"

export class User {
	userId: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: Role;
	status: Status;
	dateOfBirth: Date;
}
