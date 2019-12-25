import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HeaderService} from '../header';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperComponent {

  public showHeader$: Observable<boolean> = this.headerService.showHeader;

  constructor(private readonly headerService: HeaderService) {
  }

}
