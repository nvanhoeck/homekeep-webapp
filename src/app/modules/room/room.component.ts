import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RoomModel} from '../../shared/models';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {ButtonClass, ButtonSize, ButtonType} from '../../shared/components/buttons';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomComponent implements OnInit {
  private roomId;

  public room: RoomModel;
  public backButtonSize: ButtonSize = ButtonSize.MEDIUM;
  public backButtonClass: ButtonClass = ButtonClass.TEXT;
  public backButtonType: ButtonType = ButtonType.PRIMARY;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly cdRef: ChangeDetectorRef,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.roomId = _.get(params, 'id');
      const rooms = JSON.parse(localStorage.getItem('rooms')) as RoomModel[];
      this.room = rooms.find(value => {
        return value.id == this.roomId;
      });
      this.cdRef.markForCheck();
    });
  }

  public getAddItemToRoom(): any {
    return (room: RoomModel): void => {
      // TODO
    };
  }

  public back(): void {
    this.router.navigate(['/rooms']).finally();
  }
}
