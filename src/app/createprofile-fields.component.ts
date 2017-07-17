import 'rxjs/add/operator/switchMap';

import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Country } from './country';
import { State } from './state';
import { City } from './city';
import { Profile } from './profile';
import { CreateProfileService } from './createprofile-fields.service';

@Component({
  templateUrl: './createprofile-fields.component.html'
})
export class CreateProfileFieldsComponent {
  selectedCountryDD: Country;
  profile= new Profile('','','',undefined,undefined,undefined);
  resultCountries: Array<Country>;
  resultStates: Array<State>;
  resultCities: Array<City>;
  addProfileResponse: String;
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
 
  public saveProfile(): void {
		//console.log(`Entered saveProfile`+this.profile.professionalTitle);
		//this.selectedCountryDD = e.lcCountryName;
		this._profileService.addProfile(this.profile).
			subscribe(addProfileResponse => this.addProfileResponse = addProfileResponse);
      console.log (this.addProfileResponse );
  } 

	public processCitySelection(e: any): void {
		console.log(`Selected City value: ` + e.lcCityName);
		//this.selectedCountryDD = e.lcCountryName;
  }


  goBack(): void {
    this.location.back();
  }
}
