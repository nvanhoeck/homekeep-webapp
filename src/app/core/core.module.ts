import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {LoggerService} from './logger-service';
import {ValidationService} from './services/forms/validation.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [LoggerService, ValidationService],
  declarations: []
  })
export class CoreModule {
}
