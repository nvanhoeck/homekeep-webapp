import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoomItemEditComponent} from './room-item-edit.component';


const routes: Routes = [{
  path: 'room-item',
  children: [{
    path: ':id',
    component: RoomItemEditComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomItemEditRoutingModule {
}
