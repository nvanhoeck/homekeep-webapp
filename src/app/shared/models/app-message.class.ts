import {FormControl} from '@angular/forms';

export enum AppMessageType {
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
  WARN = 'warn'
}
export class AppMessage {
  message: string;
  validationControl: string | FormControl;
  messageType: AppMessageType;
}
