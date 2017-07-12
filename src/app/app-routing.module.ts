import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateProfileComponent }   from './createprofile.component';
import { CreateProfileFieldsComponent }      from './createprofile-fields.component';
//import { HeroDetailComponent }  from './hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'createprofile',  component: CreateProfileComponent },
  { path: 'profileFields', component: CreateProfileFieldsComponent }
  //{ path: 'heroes',     component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
