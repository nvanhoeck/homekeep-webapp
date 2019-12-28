import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddRoomRoutingModule} from './add-room-routing.module';
import {AddRoomComponent} from './add-room.component';
import {SubheaderModule} from '../../shared/components/subheader/subheader.module';
import {SectionModule} from '../../shared/components/section/section.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonsModule} from '../../shared/components/buttons/buttons.module';


@NgModule({
  declarations: [AddRoomComponent],
  imports: [
    CommonModule,
    AddRoomRoutingModule,
    SubheaderModule,
    SectionModule,
    ReactiveFormsModule,
    ButtonsModule
  ],
  exports: [AddRoomComponent]
})
export class AddRoomModule { }
