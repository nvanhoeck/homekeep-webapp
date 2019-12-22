import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private showHeader$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor() {
  }

  public getShowHeader(): Observable<boolean> {
    return this.showHeader$.asObservable();
  }

  public mayShowHeader(show: boolean): void {
    this.showHeader$.next(show);
  }

}
