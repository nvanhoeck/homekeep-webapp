import {Injectable} from '@angular/core';
import {MessagingService} from '../messaging/messaging.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly messagingService: MessagingService) {
  }

  validate(keyValue: any) {
    if (keyValue === '0000') {

    } else {
      this.messagingService.addMessage('wrong pincode', 'access');
    }
  }
}
