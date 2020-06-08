import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CallbackComponent} from './callback/callback.component';
import {CallbackRoutingModule} from './callback-routing.module';


@NgModule({
  declarations: [CallbackComponent],
  imports: [
    CommonModule,
    CallbackRoutingModule
  ]
})
export class CallbackModule { }
