import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip: any;

  constructor(
    private router: Router,
    private tripDataService: TripDataService,
    private authService: AuthenticationService
  ) { 

  }

  ngOnInit(): void {

  }

  // Check if the user is logged in to conditionally show edit and delete buttons
  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Navigate to the edit trip page with the selected trip's code
  public editTrip(trip: Trip): void {
    console.log('Edit Trip button clicked for trip code: ' + trip.code);
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  // Get form short name to access form fields
  get f() { return this.trip; }

  // TODO: Implement deleteTrip method to delete a trip from the listing page
  // Delete a trip from the listing page
  public deleteTrip(trip: Trip): void {
    console.log('Delete Trip button clicked for trip code: ' + trip.code);

    
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the trip "${trip.name}"?`
    );
    if (confirmDelete) {
      this.tripDataService.deleteTrip(trip.code).subscribe({
        next: (data: any) => {
          console.log('Trip deleted successfully');
        },
        error: (error: any) => {
          console.error('Error deleting trip:', error);
        }
      });
    } else {
      console.log('Trip deletion cancelled');
    }
  }


}
