import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WeatherService } from '../shared/weather.service';
import { WeatherDetailDto } from '../shared/WeatherDetailDto';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weatherSearchForm: FormGroup;
  weatherDetail: WeatherDetailDto;
  constructor(private fb: FormBuilder,
              private weatherService: WeatherService) { }

  ngOnInit() {
    this.createweatherSearchForm();
  }

  getWeatherDetails(formValue) {
    this.weatherService.getWeather(formValue.location)
      .subscribe(res => this.weatherDetail = res as WeatherDetailDto);
  }

  private createweatherSearchForm(): void {
    this.weatherSearchForm = this.fb.group({
      location: ['', Validators.required]
    });
  }
}
