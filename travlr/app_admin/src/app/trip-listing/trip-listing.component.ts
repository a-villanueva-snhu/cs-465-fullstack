import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { trips } from '../data/trips';  
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService]
})

export class TripListingComponent implements OnInit {
  trips!:  Trip[];
  message: string = '';
  

  constructor(
    private tripDataService: TripDataService, 
    private router: Router,
    private authService: AuthenticationService
    ) {
    console.log('TripListingComponent constructor called');
  }

  // Helper to check for logged in user to conditionally show add trip button
  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // CRUD: Create, Read, Update, Delete
  public addTrip(): void {
    console.log('Add Trip button clicked');
    this.router.navigate(['add-trip']);
  }

  ngOnInit(): void {
      console.log('TripListingComponent ngOnInit called');
      this.getStuff();
  }

  private getStuff(): void
  {
    this.tripDataService.getTrips().subscribe({
      next: (value: any) => {
        this.trips = value;
        // console.log('Trips data received:', this.trips);

        if(value.length > 0) {
          this.message = 'There are ' + value.length + ' trips available.';
        }
        else {
          this.message = 'No trips available in the database.';
        }
        console.log(this.message);
      },
      error: (err) => {
        console.error('Error fetching trips:' + err);
      }
    });
  }
}
