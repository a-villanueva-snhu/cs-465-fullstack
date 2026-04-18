import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-card',
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() trip: any;
}
