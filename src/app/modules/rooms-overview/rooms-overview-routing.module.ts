import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoomsOverviewComponent} from './rooms-overview-page/rooms-overview.component';
import {AppAuthGuard} from '../../core/guards/AppAuthGuard';


const routes: Routes = [
  {
    path: 'rooms',
    component: RoomsOverviewComponent,
    canActivate: [AppAuthGuard],
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsOverviewRoutingModule {
}
