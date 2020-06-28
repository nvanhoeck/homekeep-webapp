import {Injectable} from '@angular/core';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {RoomModel} from '../../../../shared/models';
import {RoomApiService} from '../api/room-api.service';
import {MessagingService} from '../../messaging/messaging.service';
import {AppMessageType} from '../../../../shared/models/app-message.class';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private readonly TABLE_NAME = 'rooms';

  constructor(private readonly dbService: NgxIndexedDBService,
              private readonly roomApiService: RoomApiService,
              private readonly messageService: MessagingService) {
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

  public findAll(): Promise<RoomModel[]> {
    return this.dbService.getAll(this.TABLE_NAME);
  }

  public deleteRoom$(id: number): Observable<boolean> {
    return this.roomApiService.deleteRoom$(id).pipe(
      catchError(err => {
        console.error(err);
        this.messageService.addMessage('Could not delete room', 'delete-actions', AppMessageType.ERROR);
        return throwError('Could not delete room');
      }),
      tap(result => {
          result ?
            this.dbService.delete(this.TABLE_NAME, id) :
            this.messageService.addMessage('Could not delete room', 'delete-room', AppMessageType.ERROR);
        }
      ));
  }
}
