import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HeaderService} from '../../../shared/skeleton/header';

@Component({
  selector: 'app-rooms-overview',
  templateUrl: './rooms-overview.component.html',
  styleUrls: ['./rooms-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsOverviewComponent implements OnInit {

  constructor(private readonly headerService: HeaderService,
              private readonly cdref: ChangeDetectorRef) { }

  ngOnInit() {
    this.headerService.mayShowHeader(true);
    this.cdref.markForCheck();
  }

}
