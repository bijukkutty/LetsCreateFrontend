import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './createprofile.component.html',
  styleUrls: ['./createprofile.component.css']
})

 export class CreateProfileComponent  {
  title = 'Tour of Heroes';

constructor( private router: Router) {
}

public redirectToProfileCreation(): void {
	this.router.navigate(['./profileFields']);
}
}