import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialDesignModule } from './material-design.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { IcoComponent } from './ico/ico.component';
import { AppConfig } from './shared/app-config.service';
import { AlertService } from './shared/alert.service';
import { HttpClientModule } from '@angular/common/http';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

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
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AlertService,
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
