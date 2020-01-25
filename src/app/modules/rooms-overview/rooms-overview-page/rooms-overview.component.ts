import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HeaderService} from '../../../shared/skeleton/header';
import {ButtonClass, ButtonSize, ButtonType} from '../../../shared/components/buttons';
import {Router} from '@angular/router';
import {RoomModel} from '../../../shared/models';
import {RoomService} from '../../../core/services/data/rooms/room.service';

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

  addRoomButtonClass: ButtonClass = ButtonClass.TEXT;
  addRoomButtonType: ButtonType = ButtonType.PRIMARY_TEXT_ONLY;
  addRoomButtonSize: ButtonSize = ButtonSize.XL;

  public rooms: RoomModel[];

  public activeElement: number;

  constructor(private readonly headerService: HeaderService,
              private readonly cdref: ChangeDetectorRef,
              private readonly router: Router,
              private readonly roomsDBService: RoomService) {
  }

  ngOnInit() {
    this.loadRooms();

    this.headerService.mayShowHeader(true);
    this.cdref.markForCheck();
  }

  public addRoomRedirect(): () => void {
    return () => {
      this.navigateToAddRoom();
    };
  }

  public navigateToAddRoom(): void {
    this.router.navigate(['/add-room']).finally();
  }

  public holdHandler(time: number, id: number): void {
    if (time >= 400) {
      this.activeElement = id;
    }
  }

  public deactivateElement(): void {
    this.activeElement = null;
  }

  public getActiveElementName(): string {
    return this.getActiveElementRoom().name;
  }

  public deleteRoom() {
    this.roomsDBService.deleteRoom(this.activeElement).finally();
    this.activeElement = null;
    this.loadRooms();
  }

  public navigateToRoom(id: number) {
    if (this.activeElement !== id) {
      this.router.navigate(['/room', id]).finally();
    }
  }

  private getActiveElementRoom(): RoomModel {
    return this.rooms.find(value => value.id === this.activeElement);
  }

  private loadRooms(): void {
    this.roomsDBService.findAll()
      .then(rooms => {
        this.rooms = rooms;
        this.cdref.markForCheck();
      });
  }
}
