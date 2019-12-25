import {Component, Input, OnInit} from '@angular/core';
import {ButtonClass, ButtonSize, ButtonType} from '../buttons.enums';
import {StyleBuilderClass} from '../../../models/style-builder.class';
import {LoggerService, LogginLevel} from '../../../../core';
import {BehaviorSubject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {BaseComponent} from '../../base/base.component';

@Component({
  selector: 'app-default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.scss']
})
export class DefaultButtonComponent extends BaseComponent implements OnInit {

  @Input() buttonSize: ButtonSize = ButtonSize.MEDIUM;
  @Input() buttonType: ButtonType = ButtonType.DEFAULT;
  @Input() buttonClass: ButtonClass = ButtonClass.TEXT;
  @Input() borderRadius = 0;
  @Input() text = '';
  @Input() clickEvent: any;
  @Input() inputPassChangeEvent: any;

  private inputValue: BehaviorSubject<string> = new BehaviorSubject('');


  constructor(private readonly loggerService: LoggerService) {
    super();
  }

  ngOnInit() {
    this.inputValue
      .pipe(
        debounceTime(400),
        takeUntil(this.destroy$)
      )
      .subscribe(value => this.inputPassChangeEvent(value));
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
    return 'basic-button__size--' + this.buttonSize + ' , ';
  }

  private getTypeClass(): string {
    return 'basic-button__type--' + this.buttonType + ' , ';
  }

  onClick($event: MouseEvent) {
    if (this.clickEvent) {
      this.clickEvent($event);
    } else {
      this.loggerService.log('No click event handler found for ' + $event.target + ' at default button', LogginLevel.WARN);
    }
  }

  detectInputPassChanges($event: any) {
    if (this.clickEvent) {
      this.inputValue.next($event.target.value);
    } else {
      this.loggerService.log('No change event handler found for ' + $event.target + ' at default button', LogginLevel.WARN);
    }
  }

  passEventToParent($event: any) {
    const evObj = document.createEvent('Events');
    evObj.initEvent('click', true, false);
    $event.target.parentNode.dispatchEvent(evObj);
  }

}
