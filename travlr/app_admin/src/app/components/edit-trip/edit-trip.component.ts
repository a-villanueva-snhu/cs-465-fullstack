import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../../services/trip-data.service';
import { Trip } from '../../models/trip';


@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent implements OnInit {

  public editForm!: FormGroup;
  trip!: Trip;
  submitted: boolean = false;
  message: string = '';
  originalTripCode: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService) 
    {

    }

  ngOnInit(): void {
    // retrieve the trip _id
    let tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert('Something went wrong. Trip code is missing from local storage.');
      this.router.navigate(['']);
      return;
    }

    this.originalTripCode = tripCode; // Store the original code

    console.log('EditTripComponent ngOnInit called');
    console.log('Trip code retrieved from stash: ' + tripCode);

    this.editForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', [Validators.required, Validators.min(1)]],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.tripDataService.getTrip(tripCode).subscribe({
      next: (value: Trip) => {
        let tempStart = new Date(value.start).toISOString().split('T')[0]; // Extract the date part from the ISO string
        
        // populate our record into the edit form
        this.editForm.patchValue(value);
        // address change in date format for edit form
        this.editForm.get('start')?.setValue(tempStart);

        if(!value) {
          this.message = 'No trip found with code: ' + tripCode;
        }
        else {
          this.message = 'Trip found with code: ' + tripCode;
        }
        console.log(this.message);

      },
      error: (err) => {
        console.error('Error fetching trip with code ' + tripCode + ': ' + err);
      }
    })
  }

  public onSubmit(): void {
    this.submitted = true;

    if(this.editForm.valid) {
      const formData = { ...this.editForm.value };
      // Convert date string to Date object
      if (formData.start) {
        formData.start = new Date(formData.start);
      }
      
      this.tripDataService.updateTrip(this.originalTripCode, formData).subscribe({
        next: (data: Trip) => {
          console.log(data);
          this.router.navigate(['']);
        },
        error: (err: any) => {
          console.error('Error updating trip:', err);
        }
      });
    }
  }

  // get the form short name to access form fields
  get f() { return this.editForm.controls; }
}
