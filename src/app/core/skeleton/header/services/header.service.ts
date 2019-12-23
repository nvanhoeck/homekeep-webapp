import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private showHeader: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public showHeader$: Observable<boolean> = this.showHeader.asObservable();

  constructor() {
  }

  public mayShowHeader(show: boolean): void {
    this.showHeader.next(show);
  }

}
