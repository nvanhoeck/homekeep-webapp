import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoomsOverviewRoutingModule} from './rooms-overview-routing.module';
import {RoomsOverviewComponent} from './rooms-overview-page/rooms-overview.component';
import {SubheaderModule} from '../../shared/components/subheader/subheader.module';
import {ButtonsModule} from '../../shared/components/buttons/buttons.module';
import {SectionModule} from '../../shared/components/section/section.module';
import {ContainerModule} from '../../shared/components/container/container.module';
import {DirectivesModule} from '../../shared/directives/directives.module';
import {ActionModule} from '../../shared/components/action/action.module';


@NgModule({
  declarations: [RoomsOverviewComponent],
  imports: [
    CommonModule,
    RoomsOverviewRoutingModule,
    SubheaderModule,
    ButtonsModule,
    SectionModule,
    ContainerModule,
    ActionModule,

    DirectivesModule,
  ],
  exports: [RoomsOverviewComponent]
})
export class RoomsOverviewModule {
}
