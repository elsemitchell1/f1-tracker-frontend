import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { F1Service } from '../../api/f1.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent {
  races: any[] = [];
  selectedRace: any = null;

  constructor(private f1Service: F1Service) {}

  ngOnInit(): void {
    this.f1Service.getRaceResults().subscribe((data) => {
      this.races = data.MRData.RaceTable.Races;
    });
  }
}
