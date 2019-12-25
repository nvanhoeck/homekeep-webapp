import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultButtonComponent } from './default-button/default-button.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [DefaultButtonComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [DefaultButtonComponent]
})
export class ButtonsModule { }
