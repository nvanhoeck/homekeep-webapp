import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoomComponent} from './room-component/room.component';
import {AppAuthGuard} from '../../core/guards/AppAuthGuard';


const routes: Routes = [
  {
    path: 'room',
    canActivate: [AppAuthGuard],
    children: [
      {
        path: ':id',
        component: RoomComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule {
}
