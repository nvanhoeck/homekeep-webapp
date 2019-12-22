import {RoomItemModel} from './room-item.model';

export class RoomModel {
  id: number;
  name: string;
  icon: string;
  items: RoomItemModel[];
}
