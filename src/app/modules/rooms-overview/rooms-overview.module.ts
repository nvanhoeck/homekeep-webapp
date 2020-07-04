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
import {ValidationModule} from '../../shared/components/validation/validation.module';
import {LoadingSpinnerModule} from '../../shared/components/loading-spinner/loading-spinner.module';


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
        ValidationModule,
        LoadingSpinnerModule,
    ],
  exports: [RoomsOverviewComponent]
})
export class RoomsOverviewModule {
}
