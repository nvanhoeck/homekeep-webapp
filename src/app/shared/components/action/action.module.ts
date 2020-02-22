import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActionComponent} from './action.component';


@NgModule({
    declarations: [ActionComponent],
    exports: [
        ActionComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ActionModule { }
