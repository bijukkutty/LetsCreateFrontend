import { Injectable } from '@angular/core';
import {Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ProfileRootObject } from './profile';

@Injectable()
export class ProfileService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private profileUrl = 'https://immense-caverns-35815.herokuapp.com';

    constructor (private http: Http) { }

    getProfile(id : number): Promise<ProfileRootObject> {
        const url = '${this.profileUrl}/${id}';
        return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as ProfileRootObject)
        .catch(this.handleError);
    }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}