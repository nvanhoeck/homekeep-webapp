import {Injectable} from '@angular/core';
import {MessagingService} from '../messaging/messaging.service';
import {AppMessageType} from '../../../shared/models/app-message.class';
import {AuthApiService} from './auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly messagingService: MessagingService,
              private readonly authApiService: AuthApiService) {
  }

  validate(keyValue: any): boolean {
    if (keyValue === '0000') {
      return true;
    } else if (keyValue === '0666') {
      this.authApiService.authenticate()
        .subscribe(res => {
          console.log(res);
        });
    } else {
      this.messagingService.addMessage('wrong pincode', 'access', AppMessageType.ERROR);
      return false;
    }
  }
}
