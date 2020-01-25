import {Injectable} from '@angular/core';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {RoomModel} from '../../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private readonly TABLE_NAME = 'rooms';

  constructor(private readonly dbService: NgxIndexedDBService) {
  }


  public addRoom(room: RoomModel): Promise<number> {
    return this.dbService.add(this.TABLE_NAME, room);
  }

  public updateRoom(room: RoomModel): Promise<number> {
    return this.dbService.update(this.TABLE_NAME, room);
  }

  public findRoomById(id: number): Promise<RoomModel> {
    return this.dbService.getByKey(this.TABLE_NAME, id);
  }

  public findAll(): Promise<RoomModel[]> {
    return this.dbService.getAll(this.TABLE_NAME);
  }

  public deleteRoom(id: number): Promise<number> {
    return this.dbService.delete(this.TABLE_NAME, id);
  }
}
