import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {HomeComponent} from './modules/home/home.component';
import {HomeModule} from './modules/home/home.module';
import {ButtonsModule} from './shared/components/buttons/buttons.module';
import {WrapperModule} from './shared/skeleton/wrapper/wrapper.module';
import {AuthModule} from './core/services/auth/auth.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BaseModule} from './shared/components/base/base.module';
import {SectionModule} from './shared/components/section/section.module';
import {MessagingModule} from './core/services/messaging/messaging.module';
import {ValidationModule} from './shared/components/validation/validation.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RoomsOverviewModule} from './modules/rooms-overview/rooms-overview.module';
import {SubheaderModule} from './shared/components/subheader/subheader.module';
import {AddRoomModule} from './modules/add-room/add-room.module';
import {ContainerModule} from './shared/components/container/container.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    FormsModule,
    MessagingModule,
    ValidationModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    ButtonsModule,
    BaseModule,
    SectionModule,
    ContainerModule,
    SubheaderModule,

    WrapperModule,
    HomeModule,
    RoomsOverviewModule,
    AddRoomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
