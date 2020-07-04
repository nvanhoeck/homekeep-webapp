import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultButtonComponent} from './default-button/default-button.component';
import {FormsModule} from '@angular/forms';
import {ColorPickerModule} from 'ngx-color-picker';
import {SpinnerModule} from '../spinner/spinner.module';


@NgModule({
  declarations: [DefaultButtonComponent],
    imports: [
        CommonModule,
        FormsModule,
        ColorPickerModule,
        SpinnerModule
    ],
  exports: [DefaultButtonComponent]
})
export class ButtonsModule { }
