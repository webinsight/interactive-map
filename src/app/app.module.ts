import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';
import {RegionService} from './servises/region.service';
import { SearchComponent } from './components/search/search.component';
import {
  MatAutocompleteModule, MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { SchoolEnrollmentModalComponent } from './components/school-enrollment-modal/school-enrollment-modal.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SearchComponent,
    SchoolEnrollmentModalComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LeafletModule.forRoot(),
        HttpClientModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatDatepickerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatIconModule,
    ],
  providers: [RegionService, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
