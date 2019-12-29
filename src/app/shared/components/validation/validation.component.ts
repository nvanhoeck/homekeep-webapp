import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MessagingService} from '../../../core/services/messaging/messaging.service';
import {BaseComponent} from '../base/base.component';
import {takeUntil} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationComponent extends BaseComponent implements OnInit {
  @Input() validationClass: string;
  @Input() control: FormControl;

  public message: string;
  public messageType: string;


  constructor(private readonly messagingService: MessagingService,
              private readonly cdref: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    const validationCheck: any = this.validationClass ? this.validationClass : this.control;
    this.messagingService.getMessage(validationCheck)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(appMessage => {
      if (appMessage) {
        this.message = appMessage.message;
        this.messageType = appMessage.messageType;
      }
      this.cdref.markForCheck();
    });
  }
}
