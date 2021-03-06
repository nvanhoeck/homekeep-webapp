import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoomItemEditComponent} from './room-item-edit.component';
import {HomekeepColorPickerModule} from '../color-picker/homekeep-color-picker.module';


const routes: Routes = [{
  path: 'room-item',
  children: [{
    path: ':id',
    component: RoomItemEditComponent
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes), HomekeepColorPickerModule],
  exports: [RouterModule]
})
export class RoomItemEditRoutingModule {
}
