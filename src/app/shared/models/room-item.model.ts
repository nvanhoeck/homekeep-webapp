import {RoomItemColor} from './room-item-color';

export class RoomItemModel {
  id?: number;
  name: string;
  costPerItem: number;
  totalCost?: number;
  spendedCost?: number;
  amountWanted: number;
  amountOwned: number;
  // backreference
  roomId: number;

  // new
  image?: string;
  urlLink?: string;
  colors: RoomItemColor[] = [];
  locked: false;
  alternatives?: number[];
  alternativeOf?: number;
}
