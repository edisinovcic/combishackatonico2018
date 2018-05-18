import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialDesignModule } from './material-design.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { IcoComponent } from './ico/ico.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IcoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialDesignModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
