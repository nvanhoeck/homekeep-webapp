import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoomsOverviewRoutingModule} from './rooms-overview-routing.module';
import {RoomsOverviewComponent} from './rooms-overview-page/rooms-overview.component';
import {SubheaderModule} from '../../shared/components/subheader/subheader.module';
import {ButtonsModule} from '../../shared/components/buttons/buttons.module';


@NgModule({
  declarations: [RoomsOverviewComponent],
  imports: [
    CommonModule,
    RoomsOverviewRoutingModule,
    SubheaderModule,
    ButtonsModule
  ],
  exports: [RoomsOverviewComponent]
})
export class RoomsOverviewModule { }
