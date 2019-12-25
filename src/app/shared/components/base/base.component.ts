import {Component, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';


@Component({})
export class BaseComponent implements OnDestroy {
  protected destroy$: Subject<boolean> = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
