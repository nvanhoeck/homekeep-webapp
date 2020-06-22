export const oidc = {
  clientId: 'homekeep-webapp',
  filterProtocolClaims: true,
  issuer: 'http://localhost:8180/auth/realms/homekeep',
  loadUserInfo: true,
  postLogoutRedirectUri: 'http://192.168.0.103:4200/index.html',
  redirectUri: 'http://192.168.0.103:4200/callback',
  responseType: 'code',
  scope: 'openid profile address email phone offline_access'
};
