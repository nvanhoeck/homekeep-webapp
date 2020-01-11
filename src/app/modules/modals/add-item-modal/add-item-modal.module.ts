import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddItemModalComponent} from './add-item-modal.component';
import {ButtonsModule} from '../../../shared/components/buttons/buttons.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [AddItemModalComponent],
  imports: [
    CommonModule,
    ButtonsModule,
    ReactiveFormsModule
  ],
  exports: [AddItemModalComponent],
  entryComponents: [AddItemModalComponent]
})
export class AddItemModalModule {
}
