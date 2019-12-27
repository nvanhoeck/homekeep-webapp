import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ButtonClass, ButtonSize, ButtonType} from '../buttons.enums';
import {StyleBuilderClass} from '../../../models/style-builder.class';
import {LoggerService, LogginLevel} from '../../../../core';
import {BehaviorSubject} from 'rxjs';
import {debounceTime, filter, takeUntil} from 'rxjs/operators';
import {BaseComponent} from '../../base/base.component';

@Component({
  selector: 'app-default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultButtonComponent extends BaseComponent implements OnInit {

  @Input() buttonSize: ButtonSize = ButtonSize.MEDIUM;
  @Input() buttonType: ButtonType = ButtonType.DEFAULT;
  @Input() buttonClass: ButtonClass = ButtonClass.TEXT;
  @Input() borderRadius = 0;
  @Input() text = '';
  @Input() clickEvent: any;
  @Input() inputPassChangeEvent: any;
  @Input() icon: string;
  @Input() width: string;
  @Input() height: string;
  @Input() hasShadow: boolean;

  private inputValue: BehaviorSubject<string> = new BehaviorSubject('');


  constructor(private readonly loggerService: LoggerService,
              private readonly cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.inputValue
      .pipe(
        filter(value => this.inputPassChangeEvent),
        debounceTime(400),
        takeUntil(this.destroy$)
      )
      .subscribe(value => this.inputPassChangeEvent(value));
  }

  get getClasses() {
    this.cdRef.markForCheck();
    return ''
      + (this.buttonSize ? this.getSizeClass() : '')
      + (this.buttonType ? this.getTypeClass() : '')
      + (this.hasShadow ? this.getShadowClass() : '');
  }

  get getStyles(): StyleBuilderClass {
    this.cdRef.markForCheck();
    const styleBuilder = StyleBuilderClass.build();
    return styleBuilder
      .withBorderRadius(this.borderRadius)
      .withHeight(this.height)
      .withWidth(this.width);
  }

  public onClick($event: MouseEvent) {
    if (this.clickEvent) {
      this.clickEvent($event);
    } else {
      this.loggerService.log('No click event handler found for ' + $event.target + ' at default button', LogginLevel.WARN);
    }
  }

  public detectInputPassChanges($event: any) {
    if (this.clickEvent) {
      this.inputValue.next($event.target.value);
    } else {
      this.loggerService.log('No change event handler found for ' + $event.target + ' at default button', LogginLevel.WARN);
    }
  }

  public passEventToParent($event: any) {
    const evObj = document.createEvent('Events');
    evObj.initEvent('click', true, false);
    $event.target.parentNode.dispatchEvent(evObj);
  }

  public reelevate(): void {

  }

  public elevate(): void {

  }

  private getSizeClass(): string {
    return 'basic-button__size--' + this.buttonSize + ' , ';
  }

  private getTypeClass(): string {
    return 'basic-button__type--' + this.buttonType + ' , ';
  }

  private getShadowClass(): string {
    return 'basic-button__shadow';
  }
}
