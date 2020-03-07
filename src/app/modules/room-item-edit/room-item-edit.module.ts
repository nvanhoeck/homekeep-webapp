import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoomItemEditRoutingModule} from './room-item-edit-routing.module';
import {RoomItemEditComponent} from './room-item-edit.component';
import {ContainerModule} from '../../shared/components/container/container.module';
import {ButtonsModule} from '../../shared/components/buttons/buttons.module';
import {ActionModule} from '../../shared/components/action/action.module';
import {SubheaderModule} from '../../shared/components/subheader/subheader.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RoomModule} from '../room/room.module';


@NgModule({
  declarations: [RoomItemEditComponent],
  imports: [
    CommonModule,
    RoomItemEditRoutingModule,
    ContainerModule,
    ButtonsModule,
    ActionModule,
    SubheaderModule,
    ReactiveFormsModule,
    FormsModule,
    RoomModule
  ]
})
export class RoomItemEditModule { }
