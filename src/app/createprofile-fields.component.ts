import 'rxjs/add/operator/switchMap';

import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Country } from './country';
import { State } from './state';
import { City } from './city';
import { ProfileRootObject } from './profile';
import { LcCountry } from './profile';
import { LcState } from './profile';
import { LcCity } from './profile';
import { LcPortfolio } from './profile';
import { LcSocial } from './profile';
import { LcProfileContibsXref } from './profile';
import { CreateProfileService } from './createprofile-fields.service';

@Component({
  templateUrl: './createprofile-fields.component.html'
})
export class CreateProfileFieldsComponent {
  selectedCountryDD: Country;
  lccountry: LcCountry = new LcCountry();
  lcstate: LcState = new LcState();
  lccity: LcCity = new LcCity();
  arrlcportfolio: Array<LcPortfolio> = new Array<LcPortfolio>();
  arrlcsocial: Array<LcSocial> = new Array<LcSocial>();
  arrlcProfileContibsXref: Array<LcProfileContibsXref> = new Array<LcProfileContibsXref>();
  //profile: Profile = {professionalTitle:"Pt1",yourStatement:"Ys1",aboutYou:"Ay1", country : { "lcCountryId" : 1}};
  /* profile: Profile = {professionalTitle:"Pt1",yourStatement:"Ys1",aboutYou:"Ay1", country:undefined}; */
  profileRootObject: ProfileRootObject = new ProfileRootObject();
  resultCountries: Array<Country>;
  resultStates: Array<State>;
  resultCities: Array<City>;
  addProfileResponse: String;
  constructor(private _profileService: CreateProfileService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.profileRootObject.lcCountry=this.lccountry;
    this.profileRootObject.lcState=this.lcstate;
    this.profileRootObject.lcCity=this.lccity;
    this.profileRootObject.lcPortfolios=this.arrlcportfolio;
    this.profileRootObject.lcSocials=this.arrlcsocial;
    this.profileRootObject.lcProfileContibsXrefs=this.arrlcProfileContibsXref;
    this._profileService.getCountriesAll().subscribe
    (resultCountries => this.resultCountries = resultCountries);
  }

	public processCountrySelection(e: any): void {
    this.profileRootObject.lcCountry.lcCountryId=e.lcCountryId; 
		console.log(`Selected value: ` + e.lcCountryName);
		this._profileService.getStatesForCountry(e.lcStateSelf+`/lcStates`).
			subscribe(resultStates => this.resultStates = resultStates);
  }
    
	public processStateSelection(e: any): void {
    this.profileRootObject.lcState.lcStateId=e.lcStateId; 
		console.log(`Selected value: ` + e.lcStateName);
		this._profileService.getCitiesForState(e.lcCitySelf+`/lcCities`).
			subscribe(resultCities => this.resultCities = resultCities);
  }
 
  public saveProfile(): void {
		this._profileService.addProfile(this.profileRootObject).
			subscribe(addProfileResponse => this.addProfileResponse = addProfileResponse);
      console.log (this.addProfileResponse );
  } 

	public processCitySelection(e: any): void {
    this.profileRootObject.lcCity.lcCityId=e.lcCityId; 
		console.log(`Selected City value: ` + e.lcCityName);
  }


  goBack(): void {
    this.location.back();
  }
}
