import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RoomModel} from '../../../../shared/models';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class RoomApiService {

  constructor(private readonly http: HttpClient) {
  }

  public addRoom$(room: RoomModel): Observable<RoomModel> {
    return this.http.post<RoomModel>(environment.roomsService + 'rooms', room);
  }

  public updateRoom$(room: RoomModel): Observable<RoomModel> {
    return this.http.put<RoomModel>(environment.roomsService + 'rooms', room);
  }

  public deleteRoom$(id: number): Observable<boolean> {
    return this.http.delete<boolean>(environment.roomsService + 'rooms/' + id);
  }

  getRooms$() {
    return this.http.get<RoomModel[]>(environment.roomsService + 'rooms');
  }
}

