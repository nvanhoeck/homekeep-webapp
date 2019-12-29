import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HeaderService} from '../../../shared/skeleton/header';
import {ButtonClass, ButtonSize, ButtonType} from '../../../shared/components/buttons';
import {Router} from '@angular/router';
import {RoomModel} from '../../../shared/models';

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

  public rooms: RoomModel[] = JSON.parse(localStorage.getItem('rooms'));

  constructor(private readonly headerService: HeaderService,
              private readonly cdref: ChangeDetectorRef,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.headerService.mayShowHeader(true);
    this.cdref.markForCheck();
  }

  public addRoomRedirect(): () => void {
    return () => {
      this.router.navigate(['/add-room']);
    };
  }
}
