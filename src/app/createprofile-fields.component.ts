import 'rxjs/add/operator/switchMap';

import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Country } from './country';
import { CreateProfileService } from './createprofile-fields.service';
//import { Hero }        from './hero';
//import { HeroService } from './hero.service';

@Component({
  templateUrl: './createprofile-fields.component.html'
})
export class CreateProfileFieldsComponent {
  resultCountries: Array<Country>;

  constructor(private _countryService: CreateProfileService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
   this._countryService.getCountriesAll().subscribe(resultCountries => this.resultCountries = resultCountries);
   		for (let i = 0; i < 4; i++) {
			console.log("Country is-->"+this.resultCountries[i].lcCountryName);
		}
  }

  save(): void {
   /* this.heroService.update(this.hero)
      .then(() => this.goBack());*/
  }

  goBack(): void {
    this.location.back();
  }
}
