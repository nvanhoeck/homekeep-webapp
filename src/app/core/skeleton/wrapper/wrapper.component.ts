import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HeaderService} from '../header';
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperComponent {

  public showHeader$: Observable<boolean> = this.headerService.showHeader$.pipe(delay(0));

  constructor(private readonly headerService: HeaderService) {
  }

}
