import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User, UserManager, UserManagerSettings} from 'oidc-client';
import {Router} from '@angular/router';
import {oidc} from '../../../../config/auth/auth-code-flow-config';


@Injectable({
  providedIn: 'root'
})
export class OauthService {

  private authState$ = new BehaviorSubject(false);

  private authService: UserManager;
  private user: User = null;
  private authenticated: boolean;
  private accessToken: string;
  private idToken: string;

  constructor(private router: Router) {

    const oidcConfig: UserManagerSettings = {
      authority: oidc.issuer,
      client_id: oidc.clientId,
      redirect_uri: oidc.redirectUri,
      post_logout_redirect_uri: oidc.postLogoutRedirectUri,
      response_type: oidc.responseType,
      scope: oidc.scope,
      filterProtocolClaims: oidc.filterProtocolClaims,
      loadUserInfo: oidc.loadUserInfo
    };

    this.authService = new UserManager(oidcConfig);

    this._isAuthenticated().then(state => {

      this.authState$.next(state);

      this.authState$.subscribe((authenticated: boolean) => {

        this.authenticated = authenticated;
        this.accessToken = '';

        if (this.authenticated) {
          this.setAccessToken();
        }

      });

    });

  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  public getIdToken(): string {
    return this.idToken;
  }

  private setAccessToken() {
    this.accessToken = this.user.access_token;
  }

  public async loginWithRedirect(): Promise<void> {
    return this.authService.signinRedirect();
  }

  public async handleRedirectCallback(): Promise<void> {

    this.user = await this.authService.signinRedirectCallback();

    this.authenticated = await this._isAuthenticated();

    this.authState$.next(this.authenticated);

    this.router.navigate(['/']);
  }

  public logout(returnUrl: string) {

    this.authState$.next(false);

    this.authService.signoutRedirect();
  }

  //
  // Private methods
  //

  private async _isAuthenticated(): Promise<boolean> {
    return this.user !== null && !this.user.expired;
  }

}
