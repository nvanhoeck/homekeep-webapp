import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RoomItemModel} from '../../../shared/models';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent implements OnInit {
  @Input() item: RoomItemModel;
  @Input() isSelected: boolean;

  @Output() emitSelectItem = new EventEmitter<number>();
  @Output() emitAddItemAmount = new EventEmitter<number>();
  @Output() emitReduceItemAmount = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  public selectItem(id: number): () => void {
    return () => {
      this.emitSelectItem.emit(id);
    };
  }

  public addItemAmount(id: number): () => void {
    return () => {
        this.emitAddItemAmount.emit(id);
    };
  }

  reduceItemAmount(id: number) {
    return () => {
      this.emitReduceItemAmount.emit(id);
    };
  }
}
