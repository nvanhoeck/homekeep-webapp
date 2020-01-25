export class RoomItemModel {
  id: number;
  name: string;
  costPerItem: number;
  totalCost: number;
  spendedCost: number;
  amountWanted: number;
  amountOwned: number;
  // backreference
  roomId: string;
}
