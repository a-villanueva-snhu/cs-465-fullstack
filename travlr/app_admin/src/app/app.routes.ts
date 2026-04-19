import { Routes } from '@angular/router';
import { AddTripComponent } from './components/add-trip/add-trip.component';
import { TripListingComponent } from './components/trip-listing/trip-listing.component';
import { EditTripComponent } from './components/edit-trip/edit-trip.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path : 'add-trip', component: AddTripComponent },
    { path : 'edit-trip', component: EditTripComponent },
    { path : 'delete-trip', component: TripListingComponent, pathMatch: 'full' },
    { path : 'login', component: LoginComponent },
    { path : '', component: TripListingComponent, pathMatch: 'full' }

];
