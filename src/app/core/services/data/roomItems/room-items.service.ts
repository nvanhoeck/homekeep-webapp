import {Injectable} from '@angular/core';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {RoomItemModel} from '../../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class RoomItemsService {

  private readonly TABLE_NAME = 'items';

  constructor(private readonly dbService: NgxIndexedDBService) {
  }


  public addItem(item: RoomItemModel): Promise<number> {
    return this.dbService.add(this.TABLE_NAME, item);
  }

  public updateItem(item: RoomItemModel): Promise<number> {
    return this.dbService.update(this.TABLE_NAME, item);
  }

  public findItemById(id: number): Promise<RoomItemModel> {
    return this.dbService.getByKey(this.TABLE_NAME, id);
  }

  public findAll(): Promise<RoomItemModel[]> {
    return this.dbService.getAll(this.TABLE_NAME);
  }

  public deleteItem(id: number): Promise<number> {
    return this.dbService.delete(this.TABLE_NAME, id);
  }

  findByRoomId(id: number): Promise<RoomItemModel[]> {
    return this.dbService.getAll(this.TABLE_NAME).then((items: RoomItemModel[]) => {
      return items.filter(item => item.roomId === id);
    });
  }

  deleteItemsByRoomId(activeElement: number) {
    this.findByRoomId(activeElement).then((roomItems: RoomItemModel[]) => {
      roomItems.forEach(roomItem => {
        this.dbService.delete(this.TABLE_NAME, roomItem.id).finally();
      });
    });
  }

  findAlternatives(alternatives: number[]): Promise<RoomItemModel[]> {
    return this.dbService.getAll(this.TABLE_NAME).then((alts: RoomItemModel[]) => {
      return alts.filter(alt => alternatives.includes(alt.id));
    });
  }
}
