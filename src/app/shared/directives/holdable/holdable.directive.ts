import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {interval, Observable, Subject} from 'rxjs';
import {filter, takeUntil, tap} from 'rxjs/operators';

@Directive({
  selector: '[holdable]'
})
export class HoldableDirective {
  @Output() holdTime: EventEmitter<number> = new EventEmitter();

  state: Subject<string> = new Subject();

  cancel: Observable<string>;

  constructor() {
    this.cancel = this.state.pipe(
      filter(v => v === 'cancel'),
      tap(v => {
        this.holdTime.emit(0);
      })
    );
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  @HostListener('touchstart', ['$event'])
  onExit() {
    console.log('on cancel');
    this.state.next('cancel');
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchend', ['$event'])
  onHold() {
    console.log('on hold');
    this.state.next('hold');

    const n = 100;

    interval(n).pipe(
      takeUntil(this.cancel),
      tap( v => {
        this.holdTime.emit(v * n);
      })
    ).subscribe();
  }
}
