import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RoomItemModel} from '../../../../shared/models';
import {environment} from '../../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class RoomItemsApiService {

  constructor(private readonly http: HttpClient) {
  }

  public addRoomItem$(roomItem: RoomItemModel): Observable<RoomItemModel> {
    return this.http.post<RoomItemModel>(environment.roomsItemsService + 'room-items/add', roomItem);
  }

  public updateRoomItem$(roomItem: RoomItemModel): Observable<RoomItemModel> {
    return this.http.put<RoomItemModel>(environment.roomsItemsService + 'room-items', roomItem);
  }

  public deleteRoomItem$(id: number): Observable<boolean> {
    return this.http.delete<boolean>(environment.roomsItemsService + 'room-items/' + id);
  }

  getRoomItem$() {
    return this.http.get<RoomItemModel[]>(environment.roomsItemsService + 'room-items');
  }

  getAllRooms$(rooms: number[]) {
    return this.http.post<RoomItemModel[]>(environment.roomsItemsService + 'room-items', rooms);
  }
}

