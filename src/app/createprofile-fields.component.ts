import 'rxjs/add/operator/switchMap';

import { Component, Input, OnInit }        from '@angular/core';
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
import { LcProfileInterestsXref } from './profile';
import { LcSubCategory } from './profile';
import { CateogriesRootObject } from './CategoriesResponse';
import { CategoriesResponse } from './CategoriesResponse';
import { CreateProfileService } from './createprofile-fields.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/first'
declare var $: any;

@Component({
  templateUrl: './createprofile-fields.component.html'
})
export class CreateProfileFieldsComponent {
  selectedCountryDD: Country;
  selectedStateDD: State;
  selectedCityDD: City;
  lccountry: LcCountry = new LcCountry();
  lcstate: LcState = new LcState();
  lccity: LcCity = new LcCity();
  arrlcportfolio: Array<LcPortfolio> = new Array<LcPortfolio>();
  arrlcsocial: Array<LcSocial> = new Array<LcSocial>();
  lcSubCategory: LcSubCategory;
  lcSubCategory1: LcSubCategory;
  lcProfileContibsXref: LcProfileContibsXref;
  arrlcProfileContibsXref: Array<LcProfileContibsXref> = new Array<LcProfileContibsXref>();
  lcProfileInterestsXref: LcProfileInterestsXref;
  arrlcProfileInterestsXref: Array<LcProfileInterestsXref> = new Array<LcProfileInterestsXref>();
  profileRootObject: ProfileRootObject = new ProfileRootObject();
  arrCategResp: CateogriesRootObject = new CateogriesRootObject();
  resultCountries: Array<Country>;
  resultStates: Array<State>;
  resultCities: Array<City>;
  addProfileResponse: String;
  arrCategoriesResponse: Array<CategoriesResponse>;
  arrCategoriesInterestResponse: Array<CategoriesResponse>;
  constructor(private _profileService: CreateProfileService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileRootObject.lcCountry=this.lccountry;
    this.profileRootObject.lcState=this.lcstate;
    this.profileRootObject.lcCity=this.lccity;
    this.arrlcportfolio = [new LcPortfolio(), new LcPortfolio];
    /* this.arrlcportfolio = [{lcPortfolioKey: 'port-1', lcPortfolioValue: 'port1'},
    {lcPortfolioKey: 'port-2', lcPortfolioValue: 'port2'}]; */
    this.arrlcsocial = [{lcSocialKey: 'social-1', lcSocialValue: 'social1'},
    {lcSocialKey: 'social-2', lcSocialValue: 'social2'}];
    this.profileRootObject.lcPortfolios=this.arrlcportfolio;
    this.profileRootObject.lcSocials=this.arrlcsocial;
    this.profileRootObject.lcProfileContibsXrefs=this.arrlcProfileContibsXref;
    this.profileRootObject.lcProfileInterestsXrefs=this.arrlcProfileInterestsXref;
    this._profileService.getCountriesAll().subscribe
    (resultCountries => {this.resultCountries = resultCountries;
        this.selectedCountryDD = this.resultCountries[1];
    });
    this._profileService.getCatAndSubCat().subscribe
      (arrCategoriesResponse => {this.arrCategoriesResponse = 
        arrCategoriesResponse.categoriesResponse;
        // Deep copy
          this.arrCategResp = $.extend(true, {}, arrCategoriesResponse);
          this.arrCategoriesInterestResponse = this.arrCategResp.categoriesResponse;
      });
  }
	public processCountrySelection(e: any): void {
    this.profileRootObject.lcCountry.lcCountryId=e.lcCountryId; 
    console.log(`Selected value: ` + e.lcCountryName);
    this.selectedCountryDD = e;
		this._profileService.getStatesForCountry(e.lcStateSelf+`/lcStates`).
			subscribe(resultStates => this.resultStates = resultStates);
  }
    
	public processStateSelection(e: any): void {
    this.profileRootObject.lcState.lcStateId=e.lcStateId; 
		console.log(`Selected value: ` + e.lcStateName);
		this._profileService.getCitiesForState(e.lcCitySelf+`/lcCities`).
			subscribe(resultCities => this.resultCities = resultCities);
  }

	public processCitySelection(e: any): void {
    this.profileRootObject.lcCity.lcCityId=e.lcCityId; 
		console.log(`Selected City value: ` + e.lcCityName);
  }
 
  public saveProfile(): void {
    console.log(this.arrCategoriesResponse);
    for (let category of this.arrCategoriesResponse) {
      for (let subcat of category.lcSubCategories) {
         if(subcat.hasOwnProperty('checked')){
           //to persist contributions selections
            this.lcProfileContibsXref = new LcProfileContibsXref();
            this.lcSubCategory = new LcSubCategory();
            this.lcSubCategory.lcSubCategoryId = subcat.lcSubCategoryId;
            this.lcProfileContibsXref.lcSubCategory = this.lcSubCategory;
            this.arrlcProfileContibsXref.push(this.lcProfileContibsXref);
        } 
      } 
    }
    for (let category1 of this.arrCategoriesInterestResponse) {
      for (let subcat1 of category1.lcSubCategories) {
         if(subcat1.hasOwnProperty('checked')){
            //to persist social selections
            this.lcProfileInterestsXref = new LcProfileInterestsXref();
            this.lcSubCategory1 = new LcSubCategory();
            this.lcSubCategory1.lcSubCategoryId = subcat1.lcSubCategoryId;
            this.lcProfileInterestsXref.lcSubCategory = this.lcSubCategory1;
            this.arrlcProfileInterestsXref.push(this.lcProfileInterestsXref);
        } 
      } 
    }
    console.log (this.profileRootObject );
		 this._profileService.addProfile(this.profileRootObject).
			subscribe(addProfileResponse => this.addProfileResponse = addProfileResponse);
      console.log (this.addProfileResponse ); 
  } 

  public addMorePortfolio(){
    this.arrlcportfolio.push(new LcPortfolio(), new LcPortfolio());
  }

  public addMoreSocial(){
    this.arrlcsocial.push(new LcSocial(), new LcSocial());
  }

  public goToProfileLanding(): void {
	this.router.navigate(['./profile', 3]);
  }
}
