import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoomRoutingModule} from './room-routing.module';
import {RoomComponent} from './room.component';
import {SubheaderModule} from '../../shared/components/subheader/subheader.module';
import {ButtonsModule} from '../../shared/components/buttons/buttons.module';
import {SectionModule} from '../../shared/components/section/section.module';


@NgModule({
  declarations: [RoomComponent],
  imports: [
    CommonModule,
    RoomRoutingModule,
    SubheaderModule,
    ButtonsModule,
    SectionModule
  ],
  exports: [
    RoomComponent
  ]
})
export class RoomModule {
}
