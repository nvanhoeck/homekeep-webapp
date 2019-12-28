import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddRoomComponent} from './add-room.component';


const routes: Routes = [
  {
    path: 'add-room',
    component: AddRoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRoomRoutingModule { }
