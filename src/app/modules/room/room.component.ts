import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {RoomItemModel, RoomModel} from '../../shared/models';
import {ActivatedRoute, Router} from '@angular/router';
import {ButtonClass, ButtonSize, ButtonType} from '../../shared/components/buttons';
import {ModalService} from '../../shared/components/modal/services/modal.service';
import {AddItemModalComponent} from '../modals/add-item-modal/add-item-modal.component';
import {RoomItemsService} from '../../core/services/data/roomItems/room-items.service';
import {RoomService} from '../../core/services/data/rooms/room.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomComponent implements OnInit, OnDestroy {
  private roomId: number;
  private destroy$ = new Subject();

  public room: RoomModel;
  public items: RoomItemModel[];
  public selectedItem: RoomItemModel;

  public backButtonSize: ButtonSize = ButtonSize.MEDIUM;
  public backButtonClass: ButtonClass = ButtonClass.TEXT;
  public backButtonType: ButtonType = ButtonType.PRIMARY;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly cdRef: ChangeDetectorRef,
              private readonly router: Router,
              private readonly modalService: ModalService,
              private readonly roomsService: RoomService,
              private readonly roomItemsSerivce: RoomItemsService) {
  }

  ngOnInit() {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.roomId = +_.get(params, 'id');
        this.loadRoomWithItems();
        this.loadItems();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public getAddItemToRoom(): any {
    return (): void => {
      this.modalService.openModal(AddItemModalComponent, [{attributePath: 'room', value: this.room}]);
      this.modalService.addListener(this);
    };
  }

  public modalClosed(): void {
    this.loadRoomWithItems();
  }

  public back(): void {
    this.router.navigate(['/rooms']).finally();
  }

  public getTotalItems(): string {
    return ''
      + this.items.map(value => value.amountOwned).reduce((previousValue, currentValue) => previousValue + currentValue)
      + '/'
      + this.items.map(value => value.amountWanted).reduce((previousValue, currentValue) => previousValue + currentValue);
  }

  public getTotalCost(): string {
    return '' + this.items.map(item => item.spendedCost).reduce((previousValue, currentValue) => previousValue + currentValue)
      + ' / '
      + this.items.map(item => item.totalCost).reduce((previousValue, currentValue) => previousValue + currentValue);
  }

  public getToPay(): string {
    return '' + (this.items.map(item => item.totalCost).reduce((previousValue, currentValue) => previousValue + currentValue) -
      this.items.map(item => item.spendedCost).reduce((previousValue, currentValue) => previousValue + currentValue));
  }

  public deleteItem(id: number): () => void {
    return () => {
      this.roomItemsSerivce.deleteItem(id).finally();
      this.selectedItem = undefined;
    };
  }

  public selectItem(id: number): () => void {
    return () => {
      this.selectedItem = this.items.find(room => room.id === id);
    };
  }

  public addItemAmount(id: number): () => void {
    return () => {
      if (this.selectedItem.amountOwned < this.selectedItem.amountWanted) {
        this.updateRoomItemModelAmount(id, 1, this.selectedItem);
      }
    };
  }

  reduceItemAmount(id: number) {
    return () => {
      if (this.selectedItem.amountOwned > 0) {
        this.updateRoomItemModelAmount(id, -1, this.selectedItem);
      }
    };
  }

  private updateRoomItemModelAmount(id: number, amount: number, selectedItem: RoomItemModel) {
    selectedItem.amountOwned += amount;
    this.calculatePriceAndToPay(selectedItem);
    this.roomItemsSerivce.updateItem(selectedItem).finally();
  }

  private loadRoomWithItems(): void {
    this.roomsService.findRoomById(this.roomId).then(room => {
      this.room = room;
      this.loadItems();
    });
  }

  private loadItems(): void {
    this.roomItemsSerivce.findByRoomId(this.roomId).then(items => {
      this.items = items;
      this.cdRef.markForCheck();
    });
  }

  // to service
  private calculatePriceAndToPay(selectedItem: RoomItemModel) {
    selectedItem.spendedCost = selectedItem.costPerItem * selectedItem.amountOwned;
  }
}
