import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient,
              private readonly constants: Constants) { }

  getWeather(location: string) {
    return this.http.get(`${this.constants.apiRoutes.workBaseUrl}${this.constants.apiRoutes.weatherUrl}` + location);
  }
}
