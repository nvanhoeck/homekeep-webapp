import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoomService} from './rooms/room.service';
import {RoomItemsService} from './roomItems/room-items.service';
import {RoomApiService} from './api/room-api.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    RoomService,
    RoomItemsService,
    RoomApiService
  ]
})
export class DataModule {
}
