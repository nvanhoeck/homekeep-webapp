import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RoomModel} from '../../shared/models';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
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

  public backButtonSize: ButtonSize = ButtonSize.MEDIUM;
  public backButtonClass: ButtonClass = ButtonClass.TEXT;
  public backButtonType: ButtonType = ButtonType.PRIMARY;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly cdRef: ChangeDetectorRef,
              private readonly router: Router,
              private readonly modalService: ModalService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.roomId = _.get(params, 'id');
      const rooms = JSON.parse(localStorage.getItem('rooms')) as RoomModel[];
      this.room = rooms.find(value => {
        return value.id == this.roomId;
      });
      this.cdRef.markForCheck();
    });
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

  getTotalItems(): string {
    return ''
      + this.room.items.map(value => value.amountOwned).reduce((previousValue, currentValue) => previousValue + currentValue)
      + '/'
      + this.room.items.map(value => value.amountWanted).reduce((previousValue, currentValue) => previousValue + currentValue);
  }

  getTotalCost(): string {
    return '' + this.room.items.map(room => room.spendedCost).reduce((previousValue, currentValue) => previousValue + currentValue)
      + ' / '
      + this.room.items.map(room => room.totalCost).reduce((previousValue, currentValue) => previousValue + currentValue);
  }

  getToPay(): string {
    return '' + (this.room.items.map(room => room.totalCost).reduce((previousValue, currentValue) => previousValue + currentValue) -
      this.room.items.map(room => room.spendedCost).reduce((previousValue, currentValue) => previousValue + currentValue));
  }

  deleteItem(id: number): () => void {
    return () => {
      const rooms = JSON.parse(localStorage.getItem('rooms')) as RoomModel[];

      const roomModel = rooms.find(room => room.id == this.roomId);
      roomModel.items.splice(roomModel.items.indexOf(roomModel.items.find(item => item.id == id)), 1);

      this.room = roomModel;
      localStorage.setItem('rooms', JSON.stringify(rooms));
    };
  }
}
