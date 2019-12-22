import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {LoggerService} from './logger-service';
import {WrapperModule} from './skeleton/wrapper/wrapper.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    WrapperModule,
  ],
  providers: [LoggerService],
  exports: [
    WrapperModule,
  ],
  declarations: []
  })
export class CoreModule {
}
