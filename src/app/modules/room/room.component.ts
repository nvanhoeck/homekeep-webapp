import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RoomItemModel, RoomModel} from '../../shared/models';
import {ActivatedRoute, Router} from '@angular/router';
import {ButtonClass, ButtonSize, ButtonType} from '../../shared/components/buttons';
import {ModalService} from '../../shared/components/modal/services/modal.service';
import {AddItemModalComponent} from '../modals/add-item-modal/add-item-modal.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomComponent implements OnInit {
  private roomId;

  public room: RoomModel;
  public selectedItem: RoomItemModel;

  public backButtonSize: ButtonSize = ButtonSize.MEDIUM;
  public backButtonClass: ButtonClass = ButtonClass.TEXT;
  public backButtonType: ButtonType = ButtonType.PRIMARY;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly cdRef: ChangeDetectorRef,
              private readonly router: Router,
              private readonly modalService: ModalService) {
  }

  ngOnInit() {
    /*this.activatedRoute.params.subscribe(params => {
      this.roomId = _.get(params, 'id');
      const rooms = JSON.parse(localStorage.getItem('rooms')) as RoomModel[];
      this.room = rooms.find(value => {
        return value.id == this.roomId;
      });
      this.cdRef.markForCheck();
    });*/
  }

  public getAddItemToRoom(): any {
    return (room: RoomModel): void => {
      this.modalService.openModal(AddItemModalComponent, [{attributePath: 'room', value: this.room}]);
      this.modalService.addListener(this);
    };
  }

  public modalClosed(): void {
    const rooms = JSON.parse(localStorage.getItem('rooms')) as RoomModel[];
    this.room = rooms.find(room => room.id = this.roomId);
    this.cdRef.markForCheck();
  }

  public back(): void {
    this.router.navigate(['/rooms']).finally();
  }
/*
  public getTotalItems(): string {
    return ''
      + this.room.items.map(value => value.amountOwned).reduce((previousValue, currentValue) => previousValue + currentValue)
      + '/'
      + this.room.items.map(value => value.amountWanted).reduce((previousValue, currentValue) => previousValue + currentValue);
  }

  public getTotalCost(): string {
    return '' + this.room.items.map(room => room.spendedCost).reduce((previousValue, currentValue) => previousValue + currentValue)
      + ' / '
      + this.room.items.map(room => room.totalCost).reduce((previousValue, currentValue) => previousValue + currentValue);
  }

  public getToPay(): string {
    return '' + (this.room.items.map(room => room.totalCost).reduce((previousValue, currentValue) => previousValue + currentValue) -
      this.room.items.map(room => room.spendedCost).reduce((previousValue, currentValue) => previousValue + currentValue));
  }

  public deleteItem(id: number): () => void {
    return () => {
      const rooms = JSON.parse(localStorage.getItem('rooms')) as RoomModel[];

      const roomModel = rooms.find(room => room.id == this.roomId);
      roomModel.items.splice(roomModel.items.indexOf(roomModel.items.find(item => item.id == id)), 1);

      this.room = roomModel;
      localStorage.setItem('rooms', JSON.stringify(rooms));
      this.selectedItem = undefined;
    };
  }

  public selectItem(id: number): () => void {
    return () => {
      this.selectedItem = this.room.items.find(room => room.id == id);
    };
  }

  public addItemAmount(id: number): () => void {
    return () => {
      if (this.selectedItem.amountOwned < this.selectedItem.amountWanted) {
        this.updateRoomItemModelAmount(id, 1);
      }
    };
  }

  reduceItemAmount(id: number) {
    return () => {
      if (this.selectedItem.amountOwned > 0) {
        this.updateRoomItemModelAmount(id, -1);
      }
    };
  }

  private updateRoomItemModelAmount(id: number, amount: number) {
  }*/
}
