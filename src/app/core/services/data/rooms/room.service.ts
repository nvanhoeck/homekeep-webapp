import {Injectable} from '@angular/core';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {RoomModel} from '../../../../shared/models';
import {RoomApiService} from '../api/room-api.service';
import {MessagingService} from '../../messaging/messaging.service';
import {AppMessageType} from '../../../../shared/models/app-message.class';
import {from, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {LoadingService} from '../../loading/loading.service';
import {RoomItemsService} from '../roomItems/room-items.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private readonly TABLE_NAME = 'rooms';

  constructor(private readonly dbService: NgxIndexedDBService,
              private readonly roomApiService: RoomApiService,
              private readonly messageService: MessagingService,
              private readonly loadingService: LoadingService,
              // TODO place in facade
              private readonly roomItemsService: RoomItemsService) {
  }


  public addRoom$(room: RoomModel): Observable<RoomModel> {
    return this.roomApiService.addRoom$(room)
      .pipe(
        catchError((err) => {
          this.messageService.addMessage('Could not add room', 'add-room', AppMessageType.ERROR);
          return throwError('Could not add room');
        }),
        tap(newRoom => {
          if (!!newRoom) {
            this.dbService.add(this.TABLE_NAME, newRoom);
          }
        })
      );
  }

  public updateRoom(room: RoomModel): void {
    this.roomApiService.updateRoom$(room).subscribe(updatedRoom => {
      this.dbService.update(this.TABLE_NAME, room);
    }, () => {
      this.messageService.addMessage('Could not update room', 'update-room', AppMessageType.ERROR);
    });
  }

  public findRoomById(id: number): Promise<RoomModel> {
    return this.dbService.getByKey(this.TABLE_NAME, id);
  }

  public findAll$(): Observable<RoomModel[]> {
    return this.roomApiService.getRooms$().pipe(
      catchError((err) => {
        console.error(err);
        this.messageService.addMessage('Unable to load rooms, working with offline data', 'rooms-overview', AppMessageType.ERROR);
        return throwError('Unable to load rooms');
      }),
      tap(() => this.dbService.clear(this.TABLE_NAME)),
      tap(rooms => rooms.forEach(room => this.dbService.add(this.TABLE_NAME, room))),
      // TODO place in facade & refactoring
      tap(rooms => rooms.forEach(room => this.loadingService.addLoading(room.name))),
      tap(rooms => this.roomItemsService.findAll$(rooms).subscribe()),
      tap(() => this.loadingService.stopLoading('rooms')),
      tap(() => this.messageService.clear())
    );
  }

  public deleteRoom$(id: number): Observable<boolean> {
    return this.roomApiService.deleteRoom$(id).pipe(
      catchError(err => {
        console.error(err);
        this.messageService.addMessage('Could not delete room', 'delete-room', AppMessageType.ERROR);
        return throwError('Could not delete room');
      }),
      tap(result => {
          result ?
            this.dbService.delete(this.TABLE_NAME, id) :
            this.messageService.addMessage('Could not delete room', 'delete-room', AppMessageType.ERROR);
        }
      ));
  }

  findAllLocally$() {
    return from(this.dbService.getAll<RoomModel>(this.TABLE_NAME));
  }
}
