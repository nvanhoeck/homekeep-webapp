import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppMessage} from '../../../shared/models/app-message.class';
import {filter, map} from 'rxjs/operators';

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

  getMessage(validationClass: string): Observable<string> {

    return this.lastMessage$.asObservable()
      .pipe(
        filter((appMessage: AppMessage) => {
          return validationClass && validationClass.length > 0 && appMessage ?
            (validationClass === appMessage.validationControl) : true;
        }),
        map((appMessage: AppMessage) => {
          return appMessage ? appMessage.message : null;
        })
      );
  }

  addMessage(value: string, control: string) {
    this.lastMessage$.next(
      {
        message: value,
        validationControl: control
      }
    );
  }
}
