import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Country } from './country';

@Injectable()
export class CreateProfileService {
 private baseUrl: string = 'https://immense-caverns-35815.herokuapp.com';
  constructor(private http : Http) {
  }

  getCountriesAll(): Observable<Country[]> {
    console.log('Entering getAll');
    let country$ = this.http
      .get(`${this.baseUrl}/lcCountries`, {headers: this.getHeaders()})
      .map(mapCountries).catch(handleError);
    console.log('Leaving getAll');
    return country$;
  }

    private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
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


