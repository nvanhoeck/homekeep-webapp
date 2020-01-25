import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoomService} from './rooms/room.service';
import {RoomItemsService} from './roomItems/room-items.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    RoomService,
    RoomItemsService
  ]
})
export class DataModule {
}
