import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddItemModalComponent} from './add-item-modal.component';
import {ButtonsModule} from '../../../shared/components/buttons/buttons.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidationModule} from '../../../shared/components/validation/validation.module';
import {LoadingSpinnerModule} from '../../../shared/components/loading-spinner/loading-spinner.module';


@NgModule({
  declarations: [AddItemModalComponent],
    imports: [
        CommonModule,
        ButtonsModule,
        ReactiveFormsModule,
        ValidationModule,
        LoadingSpinnerModule
    ],
  exports: [AddItemModalComponent],
  entryComponents: [AddItemModalComponent]
})
export class AddItemModalModule {
}
