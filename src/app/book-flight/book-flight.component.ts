import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors } from '@angular/forms';

import {Flight} from '../shared/interfaces/flight.interface';
import { FlightsService } from '../shared/services/flights/flights.service';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {
  public searchForm: FormGroup
  flights$: any;
  showFlights = false;
  searchData: any;
  isFormValid = false;
  constructor(private flightsService: FlightsService, private formBuilder: FormBuilder) { 
    this.searchForm = this.formBuilder.group({
      flyingFrom: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      flyingTo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      tripType: new FormControl('oneway', Validators.required),
      departDate: new FormControl('', [Validators.required]),
      returnDate: new FormControl(''),
      travelClass: new FormControl('economy', Validators.required),
      adultPassengers: new FormControl('1', Validators.required),
      childPassengers: new FormControl('0')
    });
    this.searchForm.setValidators(this.returnDateValidator());
  }
  

  returnDateValidator(): any {
    return (g: FormGroup): any => {
    const tripType = g.get('tripType')?.value;
    const returnDate = g.get('returnDate')?.value;
    const departDate = g.get('departDate')?.value;
    if(tripType === 'oneway') {
      return null;
    }
    return tripType && tripType === 'roundtrip' && returnDate && returnDate > departDate
       ? null : {'mismatch': true};
  }}

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights() {
      this.flights$ = this.flightsService.getAllFlights();
  }

  searchFlights() {
    this.showFlights = !this.showFlights;
  }

}
