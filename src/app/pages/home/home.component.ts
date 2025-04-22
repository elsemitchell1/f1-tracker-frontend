import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'F1 Tracker';
  description = 'Stay updated with the latest Formula 1 standings, race schedules, and driver stats!';
}
