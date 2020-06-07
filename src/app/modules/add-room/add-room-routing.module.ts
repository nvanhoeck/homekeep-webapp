import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddRoomComponent} from './add-room.component';
import {AppAuthGuard} from '../../core/guards/AppAuthGuard';


const routes: Routes = [
  {
    path: 'add-room',
    component: AddRoomComponent,
    canActivate: [AppAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRoomRoutingModule { }
