import {Component, Input, OnInit} from '@angular/core';
import {ButtonSize, ButtonType} from '../buttons.enums';
import {StyleBuilderClass} from '../../../models/style-builder.class';

@Component({
  selector: 'app-default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.scss']
})
export class DefaultButtonComponent implements OnInit {

  @Input() buttonSize: ButtonSize = ButtonSize.MEDIUM;
  @Input() buttonType: ButtonType = ButtonType.DEFAULT;
  @Input() borderRadius = 0;
  @Input() text = '';

  constructor() {
  }

  ngOnInit() {
  }

  get getClasses() {
    return ''
      + this.getSizeClass()
      + this.getTypeClass();
  }

  get getStyles(): StyleBuilderClass {
    return StyleBuilderClass.build()
      .withBorderRadius(this.borderRadius);
  }

  private getSizeClass(): string {
    return 'basic-button__size--' + this.buttonSize  + ' , ';
  }

  private getTypeClass(): string {
    return 'basic-button__type--' + this.buttonType + ' , ';
  }
}
