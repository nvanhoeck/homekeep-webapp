import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingProcesses$: { [name: string]: BehaviorSubject<boolean> } = {};

  constructor() {
  }

  public addLoading(name: string): void {
    const loadingProcess = this.loadingProcesses$[name];
    if (!loadingProcess) {
      this.loadingProcesses$[name] = new BehaviorSubject<boolean>(true);
    } else {
      this.loadingProcesses$[name].next(true);
    }
  }

  public stopLoading(name: string): void {
    const loadingProcess = this.loadingProcesses$[name];
    if (!!loadingProcess) {
      this.loadingProcesses$[name].next(false);
    }
  }

  public isLoading$(name: string): Observable<boolean> {
    const loadingProcess = this.loadingProcesses$[name];
    if (!!loadingProcess) {
      return this.loadingProcesses$[name].asObservable();
    } else {
      this.loadingProcesses$[name] = new BehaviorSubject<boolean>(false);
      return this.loadingProcesses$[name].asObservable();
    }
  }
}
