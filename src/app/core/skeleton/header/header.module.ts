import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header.component';
import {HeaderService} from './services/header.service';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule
  ],
  providers: [
    HeaderService
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
