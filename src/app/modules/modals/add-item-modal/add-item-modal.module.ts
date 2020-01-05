import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddItemModalComponent} from './add-item-modal.component';
import {ButtonsModule} from '../../../shared/components/buttons/buttons.module';


@NgModule({
  declarations: [AddItemModalComponent],
  imports: [
    CommonModule,
    ButtonsModule
  ],
  exports: [AddItemModalComponent],
  entryComponents: [AddItemModalComponent]
})
export class AddItemModalModule {
}
