import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {OauthService} from '../services/auth/oauth.service';
import {LoggerService, LogginLevel} from '../logger-service';


@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: OauthService,
              private logger: LoggerService) {

    this.logger.log('AuthInterceptor: constructor()', LogginLevel.DEFAULT);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const accessToken = this.authService.getAccessToken();

    if (accessToken) {

      // this.logger.info('AuthInterceptor: intercept() Bearer ' + accessToken);

      const authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + accessToken } });
      return next.handle(authReq);
    }

    return next.handle(req);
  }

}
