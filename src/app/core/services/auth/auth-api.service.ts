import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private readonly http: HttpClient) {
  }

  public authenticate(): Observable<any> {
    return this.http.get('http://localhost:9090/rooms/actuator/health');
  }
}
