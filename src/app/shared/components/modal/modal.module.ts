import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalComponent} from './modal.component';
import {ModalService} from './services/modal.service';
import {ButtonsModule} from '../buttons/buttons.module';


@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    ButtonsModule
  ],
  exports: [ModalComponent],
  providers: [
    ModalService
  ],
  entryComponents: [ModalComponent]
})
export class ModalModule { }
