export interface DriverData {
	name: string;
	familyName: string;
	constructorName: string;
	points: number;
	position: number;
	wins: number;
}

export class Driver implements DriverData {
	constructor(
		public name: string,
		public familyName: string,
		public constructorName: string,
		public points: number,
		public position: number,
		public wins: number
	) {}

	get fullName(): string {
		return `${this.name}`;
	}
}
