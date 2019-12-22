import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {LoggerService} from './logger-service';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [LoggerService],
  bootstrap: []
  })
export class CoreModule {
}
