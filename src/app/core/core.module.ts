import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {LoggerService} from './logger-service';
import {WrapperModule} from './wrapper/app-wrapper/wrapper.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    WrapperModule
  ],
  providers: [LoggerService],
  exports: [
    WrapperModule
  ],
  declarations: [
    FooterComponent,
    HeaderComponent
  ]
  })
export class CoreModule {
}
