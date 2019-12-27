import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoomsOverviewRoutingModule} from './rooms-overview-routing.module';
import {RoomsOverviewComponent} from './rooms-overview-page/rooms-overview.component';
import {SubheaderModule} from '../../shared/components/subheader/subheader.module';


@NgModule({
  declarations: [RoomsOverviewComponent],
  imports: [
    CommonModule,
    RoomsOverviewRoutingModule,
    SubheaderModule
  ],
  exports: [RoomsOverviewComponent]
})
export class RoomsOverviewModule { }
