import {Injectable} from '@angular/core';
import {MessagingService} from '../messaging/messaging.service';
import {AppMessageType} from '../../../shared/models/app-message.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly messagingService: MessagingService) {
  }

  validate(keyValue: any): boolean {
    if (keyValue === '0000') {
      return true;
    } else {
      this.messagingService.addMessage('wrong pincode', 'access', AppMessageType.ERROR);
      return false;
    }
  }
}
