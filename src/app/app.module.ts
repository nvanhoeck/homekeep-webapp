import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {ModelsModule} from './shared/models/models.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ModelsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
