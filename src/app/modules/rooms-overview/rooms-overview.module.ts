import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoomsOverviewRoutingModule} from './rooms-overview-routing.module';
import {RoomsOverviewComponent} from './rooms-overview-page/rooms-overview.component';
import {SubheaderModule} from '../../shared/components/subheader/subheader.module';
import {ButtonsModule} from '../../shared/components/buttons/buttons.module';
import {SectionModule} from '../../shared/components/section/section.module';


@NgModule({
  declarations: [RoomsOverviewComponent],
  imports: [
    CommonModule,
    RoomsOverviewRoutingModule,
    SubheaderModule,
    ButtonsModule,
    SectionModule
  ],
  exports: [RoomsOverviewComponent]
})
export class RoomsOverviewModule { }
