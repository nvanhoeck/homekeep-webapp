import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WrapperRoutingModule } from './wrapper-routing.module';
import {WrapperComponent} from './wrapper/wrapper.component';


@NgModule({
  declarations: [WrapperComponent],
  imports: [
    CommonModule,
    WrapperRoutingModule
  ],
  exports: [WrapperComponent]
})
export class WrapperModule { }
