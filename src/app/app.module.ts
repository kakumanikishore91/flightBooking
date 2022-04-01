import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { HttpClientModule } from '@angular/common/http';
import { FlightsService } from './shared/services/flights/flights.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AlertService, ApiService, AuthenticationService } from './shared/services/auth';
import { fakeBackendProvider } from './shared/helpers';



@NgModule({
  declarations: [
    AppComponent,
    BookFlightComponent,
    ManageBookingComponent,
    BookingHistoryComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [FlightsService, AuthenticationService, ApiService, AlertService, fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
