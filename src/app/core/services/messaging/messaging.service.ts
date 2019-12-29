import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppMessage, AppMessageType} from '../../../shared/models/app-message.class';
import {filter} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private lastMessage$: BehaviorSubject<AppMessage> = new BehaviorSubject(null);

  constructor() {
  }

  public clear(): void {
    this.lastMessage$.next(null);
  }

  getMessage(validationClass: string | FormControl): Observable<AppMessage> {
    return this.lastMessage$.asObservable()
      .pipe(
        filter((appMessage: AppMessage) => {
          return this.allowedToListenToMessage(validationClass, appMessage);
        })
      );
  }

  private allowedToListenToMessage(validationClass: string | FormControl, appMessage: AppMessage) {
    if (typeof validationClass === 'string') {
      return validationClass && validationClass.length > 0 && appMessage ?
        (validationClass === appMessage.validationControl) : true;
    } else {
      return appMessage && validationClass === appMessage.validationControl;
    }
  }

  addMessage(value: string, control: string, type: AppMessageType) {
    this.lastMessage$.next(
      {
        message: value,
        validationControl: control,
        messageType: type
      }
    );
  }

  addControlMessage(value: string, control: FormControl, type: AppMessageType) {
    this.lastMessage$.next(
      {
        message: value,
        validationControl: control,
        messageType: type
      }
    );
  }
}
