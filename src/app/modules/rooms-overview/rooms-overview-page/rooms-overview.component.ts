import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HeaderService} from '../../../shared/skeleton/header';
import {ButtonClass, ButtonSize, ButtonType} from '../../../shared/components/buttons';
import {Router} from '@angular/router';
import {RoomModel} from '../../../shared/models';
import {RoomService} from '../../../core/services/data/rooms/room.service';
import {RoomItemsService} from '../../../core/services/data/roomItems/room-items.service';
import {Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {LoadingService} from '../../../core/services/loading/loading.service';

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

  public isLoading$ = this.loadingService.isLoading$('rooms');

  public rooms$: Observable<RoomModel[]> = this.roomsService.findAllLocally$().pipe(tap(() => this.cdref.detectChanges()));
  public roomName$: Observable<string> = this.rooms$.pipe(map(rooms => {
    if (!!rooms && rooms.length > 0) {
      const activeRoom = rooms.find(room => room.id === this.activeElement);
      return (!!activeRoom && !!activeRoom.name) ? activeRoom.name : '';
    } else {
      return '';
    }
  }));
  public activeElement: number;

  constructor(private readonly headerService: HeaderService,
              private readonly cdref: ChangeDetectorRef,
              private readonly router: Router,
              // TODO place in facade
              private readonly roomsService: RoomService,
              private readonly roomsItemService: RoomItemsService,
              private readonly loadingService: LoadingService) {
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

  public deleteRoom() {
    this.loadingService.addLoading('rooms');
    this.roomsService.deleteRoom$(this.activeElement).subscribe(isDeleted => {
      this.roomsItemService.deleteItemsByRoomId(this.activeElement);
      this.activeElement = null;
      this.loadRooms();
    });
  }

  public navigateToRoom(id: number) {
    if (this.activeElement !== id) {
      this.router.navigate(['/room', id]).finally();
    }
  }

  public hasActiveElement(): boolean {
    return !!this.activeElement;
  }

  private loadRooms(): void {
    this.loadingService.addLoading('rooms');
    this.cdref.markForCheck();
    this.roomsService.findAll$()
      .pipe(switchMap(() => this.roomsService.findAllLocally$()))
      .subscribe((rooms) => {
        this.rooms$ = this.roomsService.findAllLocally$().pipe(tap(() => this.cdref.detectChanges()));
        this.cdref.markForCheck();
      });
  }
}
