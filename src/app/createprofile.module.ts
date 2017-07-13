import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { CreateProfileService } from './createprofile-fields.service';
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
    HttpModule
  ],
  providers: [CreateProfileService]
})
export class CreateProfileModule { }
