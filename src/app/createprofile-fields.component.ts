import 'rxjs/add/operator/switchMap';

import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Country } from './country';
import { State } from './state';
import { City } from './city';
import { CreateProfileService } from './createprofile-fields.service';
//import { Hero }        from './hero';
//import { HeroService } from './hero.service';

@Component({
  templateUrl: './createprofile-fields.component.html'
})
export class CreateProfileFieldsComponent {
  selectedCountryDD: Country;
  resultCountries: Array<Country>;
  resultStates: Array<State>;
  resultCities: Array<City>;
  constructor(private _profileService: CreateProfileService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this._profileService.getCountriesAll().subscribe
    (resultCountries => this.resultCountries = resultCountries);
  }

	public processCountrySelection(e: any): void {
		console.log(`Selected value: ` + e.lcCountryName);
		//this.selectedCountryDD = e.lcCountryName;
		this._profileService.getStatesForCountry(e.lcStateSelf+`/lcStates`).
			subscribe(resultStates => this.resultStates = resultStates);
  }
    
	public processStateSelection(e: any): void {
		console.log(`Selected value: ` + e.lcStateName);
		//this.selectedCountryDD = e.lcCountryName;
		this._profileService.getCitiesForState(e.lcCitySelf+`/lcCities`).
			subscribe(resultCities => this.resultCities = resultCities);
  }
 
	public processCitySelection(e: any): void {
		console.log(`Selected City value: ` + e.lcCityName);
		//this.selectedCountryDD = e.lcCountryName;
  }


  goBack(): void {
    this.location.back();
  }
}
