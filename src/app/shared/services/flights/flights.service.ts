import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Flight } from '../../interfaces/flight.interface';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  model = 'flights';

  constructor(private http: HttpClient) {}

  getAllFlights() {
    return this.http.get<Flight[]>(this.getUrl());
  }

  private getUrl() {
    return `${BASE_URL}/${this.model}`;
  }
}
