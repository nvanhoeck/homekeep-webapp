import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private _showHeader: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private showHeader$: Observable<boolean> = this._showHeader.asObservable();

  constructor() {
  }

  public mayShowHeader(show: boolean): void {
    this._showHeader.next(show);
  }


  get showHeader(): Observable<boolean> {
    return this._showHeader.asObservable();
  }
}
