import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HeaderService} from '../../../shared/skeleton/header';
import {ButtonClass, ButtonSize, ButtonType} from '../../../shared/components/buttons';

@Component({
  selector: 'app-rooms-overview',
  templateUrl: './rooms-overview.component.html',
  styleUrls: ['./rooms-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsOverviewComponent implements OnInit {
  addRoomEmptyButtonClass: ButtonClass = ButtonClass.TEXT;
  addRoomEmptyButtonType: ButtonType = ButtonType.PRIMARY;
  addRoomEmptyButtonSize: ButtonSize = ButtonSize.BIG;

  constructor(private readonly headerService: HeaderService,
              private readonly cdref: ChangeDetectorRef) { }

  ngOnInit() {
    this.headerService.mayShowHeader(true);
    this.cdref.markForCheck();
  }

}
