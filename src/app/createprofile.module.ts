import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { CreateProfileComponent } from './createprofile.component';
import { CreateProfileFieldsComponent } from './createprofile-fields.component';

@NgModule({
  declarations: [
    CreateProfileComponent,
    CreateProfileFieldsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [CreateProfileComponent]
})
export class AppModule { }
