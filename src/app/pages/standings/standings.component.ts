import { Component, OnInit } from '@angular/core';
import { F1Service } from '../../api/f1.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-standings',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './standings.component.html',
	styleUrl: './standings.component.scss',
})
export class StandingsComponent implements OnInit {
	driverStandings: any[] = [];
	constructorStandings: any[] = [];

	constructor(private f1Service: F1Service) {}

	ngOnInit(): void {
		this.f1Service.getCurrentDriverStandings().subscribe((data) => {
			this.driverStandings =
				data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
		});
		this.f1Service.getCurrentConstructorStandings().subscribe((data) => {
			this.constructorStandings =
				data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
		});
	}
}
