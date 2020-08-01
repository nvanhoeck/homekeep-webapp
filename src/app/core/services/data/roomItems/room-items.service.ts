import {Injectable} from '@angular/core';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {RoomItemModel, RoomModel} from '../../../../shared/models';
import {catchError, take, tap} from 'rxjs/operators';
import {RoomItemsApiService} from '../api/room-items-api.service';
import {Observable, throwError} from 'rxjs';
import {LoadingService} from '../../loading/loading.service';
import {AppMessageType} from '../../../../shared/models/app-message.class';
import {MessagingService} from '../../messaging/messaging.service';

@Injectable({
  providedIn: 'root'
})
export class RoomItemsService {

  private readonly TABLE_NAME = 'items';

  constructor(private readonly dbService: NgxIndexedDBService,
              private readonly roomItemsApiService: RoomItemsApiService,
              private readonly loadingService: LoadingService,
              private readonly messageService: MessagingService) {
  }

  public addItem$(item: RoomItemModel): Observable<RoomItemModel> {
    return this.roomItemsApiService.addRoomItem$(item)
      .pipe(
        catchError((err) => {
          this.messageService.addMessage('Could not add room-item', 'add-room-item', AppMessageType.ERROR);
          this.loadingService.stopLoading('add-item');
          return throwError('Could not add room-item');
        }),
        tap(newRoom => {
          if (!!newRoom) {
            this.dbService.add(this.TABLE_NAME, newRoom);
          }
        })
      );
  }

  public findItemById(id: number): Promise<RoomItemModel> {
    return this.dbService.getByKey(this.TABLE_NAME, id);
  }

  public updateItem$(item: RoomItemModel): Observable<RoomItemModel> {
    return this.roomItemsApiService.updateRoomItem$(item)
      .pipe(
        catchError((err) => {
          this.messageService.addMessage('Could not update room-item', 'update-room-item', AppMessageType.ERROR);
          return throwError('Could not update room-item');
        }),
        tap(updatedRoomItem => {
        this.dbService.update(this.TABLE_NAME, updatedRoomItem);
      }, () => {
        this.messageService.addMessage('Could not update room-item', 'update-room-item', AppMessageType.ERROR);
      }));
  }

  public findAll$(rooms: RoomModel[]): Observable<RoomItemModel[]> {
    return this.roomItemsApiService.getAllRooms$(rooms.map(room => room.id)).pipe(
      tap(() => this.dbService.clear(this.TABLE_NAME)),
      tap(roomItems => roomItems.forEach(roomItem => this.dbService.add(this.TABLE_NAME, roomItem))),
      tap(roomItems => rooms.forEach(room => this.loadingService.stopLoading(room.name))),
    );
  }

  public deleteItem$(id: number): Observable<boolean> {
    return this.roomItemsApiService.deleteRoomItem$(id).pipe(
      catchError(err => {
        console.error(err);
        this.messageService.addMessage('Could not delete room-item', 'delete-room-item', AppMessageType.ERROR);
        return throwError('Could not delete room');
      }),
      tap(result => {
          result ?
            this.dbService.delete(this.TABLE_NAME, id) :
            this.messageService.addMessage('Could not delete room-item', 'delete-room-item', AppMessageType.ERROR);
        }
      ));
  }

  findByRoomId(id: number): Promise<RoomItemModel[]> {
    return this.dbService.getAll(this.TABLE_NAME).then((items: RoomItemModel[]) => {
      return items.filter(item => item.roomId === id);
    });
  }

  deleteItemsByRoomId(activeElement: number) {
    this.findByRoomId(activeElement).then((roomItems: RoomItemModel[]) => {
      roomItems.forEach(roomItem => {
        this.deleteItem$(roomItem.id).pipe(take(1)).subscribe();
      });
    });
  }

  findAlternatives(alternatives: number[]): Promise<RoomItemModel[]> {
    return this.dbService.getAll(this.TABLE_NAME).then((alts: RoomItemModel[]) => {
      return alts.filter(alt => alternatives.includes(alt.id));
    });
  }
}
