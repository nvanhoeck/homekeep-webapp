import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WrapperRoutingModule} from './wrapper-routing.module';
import {WrapperComponent} from './wrapper.component';
import {HeaderModule} from '../header/header.module';
import {FooterModule} from '../footer/footer.module';


@NgModule({
  declarations: [WrapperComponent],
  imports: [
    CommonModule,
    WrapperRoutingModule,
    HeaderModule,
    FooterModule
  ],
  exports: [WrapperComponent]
})
export class WrapperModule { }
