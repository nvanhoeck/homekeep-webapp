import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {LoggerService} from './logger-service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [LoggerService],
  declarations: []
  })
export class CoreModule {
}
