import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileService } from './profile.service';
//import { RootObject } from './profileread';

@Component({
  templateUrl: './createprofile.component.html',
  styleUrls: ['./createprofile.component.css']
})

 export class CreateProfileComponent  {
  title = 'Tour of Heroes';
 // selectedProfile : RootObject;

constructor(
    private profileService: ProfileService,
    private router: Router) { }


public redirectToProfileCreation(): void {
	this.router.navigate(['./profileFields']);
}

/*public getUserProfile() : void {

this.profileService.getProfile(6).then(selectedProfile => this.selectedProfile = selectedProfile);

console.info("Selected Profile--->", this.selectedProfile.profileRootObject.lcProfileId);
        
}*/

 }