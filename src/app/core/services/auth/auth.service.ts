import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  validate(keyValue: any) {
    console.log(keyValue);
  }
}
