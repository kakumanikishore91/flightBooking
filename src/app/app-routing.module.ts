import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';

const routes: Routes = [
  {path:"",component:BookFlightComponent},
  {path:"home",component:BookFlightComponent},
  {path:"book-flight",component:BookFlightComponent},
  {path:"manage-booking",component:ManageBookingComponent},
  {path:"booking-history",component:BookingHistoryComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
