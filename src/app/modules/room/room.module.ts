import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoomRoutingModule} from './room-routing.module';
import {RoomComponent} from './room-component/room.component';
import {SubheaderModule} from '../../shared/components/subheader/subheader.module';
import {ButtonsModule} from '../../shared/components/buttons/buttons.module';
import {SectionModule} from '../../shared/components/section/section.module';
import {RoomItemComponent} from './room-item-component/room-item.component';
import {ActionModule} from '../../shared/components/action/action.module';


@NgModule({
  declarations: [RoomComponent, RoomItemComponent],
  imports: [
    CommonModule,
    RoomRoutingModule,
    SubheaderModule,
    ButtonsModule,
    SectionModule,
    ActionModule
  ],
  exports: [
    RoomComponent,
    RoomItemComponent
  ]
})
export class RoomModule {
}
