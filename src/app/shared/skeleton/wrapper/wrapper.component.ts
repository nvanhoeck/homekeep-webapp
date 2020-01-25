import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HeaderService} from '../header';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperComponent implements OnInit {

  public showHeader$: Observable<boolean> = this.headerService.showHeader;
  promptEvent: any;

  constructor(private readonly headerService: HeaderService) {
  }

  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', event => {
      alert('prompt event triggered');
      this.promptEvent = event;
    });
  }

  installPwa() {
    this.promptEvent.prompt();
  }
}
