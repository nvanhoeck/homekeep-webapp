import {NgModule} from '@angular/core';
import {RoomModel} from './room.model';
import {RoomItemModel} from './room-item.model';

@NgModule({
  declarations: [
    RoomModel,
    RoomItemModel
  ],
  exports: [
    RoomModel,
    RoomItemModel
  ]
})
export class ModelsModule {}
