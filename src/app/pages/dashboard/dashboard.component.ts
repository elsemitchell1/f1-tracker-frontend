import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { F1Service } from '../../api/f1.service';
import {
	CdkDragDrop,
	CdkDropList,
	CdkDrag,
	moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Driver } from '../../models/driverModel';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [CommonModule, FormsModule, CdkDropList, CdkDrag],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
	private baseUrl = 'https://localhost:7161/api';
	isLoggedIn = false;
	username = '';
	email = '';
	password = '';
	signupUsername = '';
	signupEmail = '';
	signupPassword = '';
	favoriteDrivers: Driver[] = [];
	driverStandings: any[] = [];
	newDriver = '';
	userEmail = '';

	constructor(private http: HttpClient, private f1Service: F1Service) {}

	ngOnInit(): void {
		this.isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in
		if (this.isLoggedIn) {
			this.decodeToken();
			this.f1Service.getCurrentDriverStandings().subscribe((data) => {
				this.driverStandings =
					data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
				this.loadFavoriteDrivers();
			});
		}
	}

	drop(event: CdkDragDrop<Driver[]>): void {
		console.log('Previous Index:', event.previousIndex);
		console.log('Current Index:', event.currentIndex);
		console.log('Before Move:', this.favoriteDrivers);
		moveItemInArray(
			this.favoriteDrivers,
			event.previousIndex,
			event.currentIndex
		);
		console.log('After Move:', this.favoriteDrivers);
	}

	decodeToken(): void {
		const token = localStorage.getItem('token');
		if (token) {
			const decoded: any = jwtDecode(token);
			this.username = decoded.username;
			this.userEmail = decoded.email;
		}
	}

	login(): void {
		this.http
			.post(`${this.baseUrl}/auth/login`, {
				username: this.username,
				email: this.email,
				password: this.password,
			})
			.subscribe((response: any) => {
				localStorage.setItem('token', response.token);
				this.isLoggedIn = true;
				this.decodeToken();
				this.f1Service.getCurrentDriverStandings().subscribe((data) => {
					this.driverStandings =
						data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
					this.loadFavoriteDrivers();
				});
			});
	}

	signup(): void {
		this.http
			.post(`${this.baseUrl}/auth/register`, {
				username: this.signupUsername,
				email: this.signupEmail,
				password: this.signupPassword,
			})
			.subscribe(() => {
				alert('Signup successful! Please log in.');
			});
	}

	logout(): void {
		localStorage.removeItem('token');
		this.isLoggedIn = false;
		this.favoriteDrivers = [];
	}

	loadFavoriteDrivers(): void {
		const token = localStorage.getItem('token');
		this.http
			.get(`${this.baseUrl}/user/favorites`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.subscribe((response: any) => {
				this.favoriteDrivers = response.drivers.map((driverName: string) => {
					// Match the driver name with driverStandings
					const driver = this.driverStandings.find(
						(d) => `${d.Driver.givenName} ${d.Driver.familyName}` === driverName
					);
					// Return the matched driver or a placeholder
					return new Driver(
						`${driver.Driver.givenName} ${driver.Driver.familyName}`,
						`${driver.Driver.familyName}`,
						driver.Constructors[0].name,
						driver.points,
						driver.position,
						driver.wins
					);
				});
			});
	}

	addFavoriteDriver(): void {
		if (!this.newDriver || this.newDriver.trim() === '') {
			alert('Please enter a driver name.');
			return;
		}
		const token = localStorage.getItem('token');
		this.http
			.post(
				`${this.baseUrl}/user/favorites`,
				{ driverName: this.newDriver },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.subscribe(() => {
				this.loadFavoriteDrivers();
				this.newDriver = '';
			});
	}
	removeFavoriteDriver(driver: string): void {
		const token = localStorage.getItem('token');
		this.http
			.delete(`${this.baseUrl}/user/favorites/${driver}`, {
				headers: { Authorization: `Bearer ${token}` },
				body: { driverName: driver },
			})
			.subscribe(() => {
				this.loadFavoriteDrivers();
			});
	}

	getDriverImageUrl(driver: any): string {
		return `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/2025Drivers/${driver.familyName.toLowerCase()}`;
	}
}
