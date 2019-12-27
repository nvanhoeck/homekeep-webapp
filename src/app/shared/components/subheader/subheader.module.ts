import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubheaderComponent} from './subheader.component';


@NgModule({
  declarations: [SubheaderComponent],
  imports: [
    CommonModule
  ],
  exports: [SubheaderComponent]
})
export class SubheaderModule { }
