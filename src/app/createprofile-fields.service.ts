import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Country } from './country';
import { State } from './state';
import { City } from './city';
import {Profile} from './profile';

@Injectable()
export class CreateProfileService {
 private baseUrl: string = 'https://immense-caverns-35815.herokuapp.com';
  constructor(private http : Http) {
  }

  getCountriesAll(): Observable<Country[]> {
    let country$ = this.http
      .get(`${this.baseUrl}/lcCountries`, {headers: this.getHeaders()})
      .map(mapCountries).catch(handleError);
    return country$;
  }
    
  getStatesForCountry(url:string): Observable<State[]> {
    let state$ = this.http
      .get(url, {headers: this.getHeaders()})
      .map(mapStates).catch(handleError);
    return state$;
  }

  getCitiesForState(url:string): Observable<City[]> {
    let city$ = this.http
      .get(url, {headers: this.getHeaders()})
      .map(mapCities).catch(handleError);
    return city$;
  }

    private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
    addProduct(profile: Profile) {                
        let body = JSON.stringify(profile);            
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${this.baseUrl}/profileSave`, body, options)
            .map(this.extractData)
            .catch(handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

}

function handleError (error: any) {
  // log error
  // could be something more sofisticated 
  let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`;
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}

function mapCountries(response:Response): Country[] {
   // The response of the API has a results
   // property with the actual results
   return response.json()._embedded.lcCountries.map(toCountry);
   
}

function toCountry(r:any): Country {
  let country = <Country>({
    lcCountryName: r.lcCountryName,
    lcStateSelf: r._links.self.href
  });
  console.log('Parsed Country:', country);
  return country;
}

function mapStates(response:Response): State[] {
   // The response of the API has a results
   // property with the actual results
   return response.json()._embedded.lcStates.map(toState);
   
}

function toState(r:any): State {
  let state = <State>({
    lcStateName: r.lcStateName,
    lcCitySelf: r._links.self.href
  });
  console.log('Parsed Country:', state);
  return state;
}

function mapCities(response:Response): City[] {
   // The response of the API has a results
   // property with the actual results
   return response.json()._embedded.lcCities.map(toCity);
   
}

function toCity(r:any): City {
  let city = <City>({
    lcCityName: r.lcCityName,
    lcCitySelf: r._links.self.href
  });
  console.log('Parsed City:', city);
  return city;
}
