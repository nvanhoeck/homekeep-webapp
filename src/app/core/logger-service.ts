import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class LoggerService {
  public log(message: string, level: LogginLevel): void {
    if (level <= environment.loggingLevel) {
      this.handleLogging(message, level);
    }
  }

  private handleLogging(message: string, level: LogginLevel) {
    switch (level) {
      case LogginLevel.DEFAULT: console.log(message); break;
      case LogginLevel.WARN: console.warn(message); break;
      case LogginLevel.ERROR: console.error(message); break;
      default: console.log(message);
    }
  }
}


export enum LogginLevel {
  DEFAULT = 0,
  WARN = 1,
  ERROR = 2
}
