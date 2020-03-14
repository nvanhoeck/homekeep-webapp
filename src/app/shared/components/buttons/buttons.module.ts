import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultButtonComponent} from './default-button/default-button.component';
import {FormsModule} from '@angular/forms';
import {ColorPickerModule} from 'ngx-color-picker';


@NgModule({
  declarations: [DefaultButtonComponent],
    imports: [
        CommonModule,
        FormsModule,
        ColorPickerModule
    ],
  exports: [DefaultButtonComponent]
})
export class ButtonsModule { }
