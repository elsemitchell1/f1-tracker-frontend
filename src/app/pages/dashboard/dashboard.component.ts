import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
	private baseUrl = 'https://localhost:7161/api';
	isLoggedIn = false;
	email = '';
	password = '';
	signupEmail = '';
	signupPassword = '';
	favoriteDrivers: string[] = [];
	newDriver = '';
	userEmail = '';

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in
		if (this.isLoggedIn) {
			this.decodeToken();
			this.loadFavoriteDrivers();
		}
	}

	decodeToken(): void {
		const token = localStorage.getItem('token');
		if (token) {
			const decoded: any = jwtDecode(token);
			console.log(decoded);
			this.userEmail = decoded.email;
		}
	}

	login(): void {
		this.http
			.post(`${this.baseUrl}/auth/login`, {
				email: this.email,
				password: this.password,
			})
			.subscribe((response: any) => {
				localStorage.setItem('token', response.token);
				this.isLoggedIn = true;
				this.decodeToken();
				this.loadFavoriteDrivers();
			});
	}

	signup(): void {
		this.http
			.post(`${this.baseUrl}/auth/register`, {
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
				this.favoriteDrivers = response.drivers;
			});
	}

	addFavoriteDriver(): void {
		const token = localStorage.getItem('token');
		this.http
			.post(
				`${this.baseUrl}/user/favorites`,
				{ driverName: this.newDriver },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.subscribe(() => {
				this.favoriteDrivers.push(this.newDriver);
				this.newDriver = '';
			});
	}
}
