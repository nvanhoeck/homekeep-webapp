import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonClass, ButtonSize, ButtonType} from '../../../shared/components/buttons';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../../shared/components/modal/services/modal.service';
import {Subject} from 'rxjs';
import {debounceTime, filter, takeUntil} from 'rxjs/operators';
import {RoomItemModel, RoomModel} from '../../../shared/models';
import {RoomItemsService} from '../../../core/services/data/roomItems/room-items.service';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.scss']
})
export class AddItemModalComponent implements OnInit, OnDestroy {
  public room: RoomModel;

  private destroy$: Subject<boolean> = new Subject();

  public itemPrice = 0.0;
  public itemAmount = 1;

  buttonType: ButtonType = ButtonType.PRIMARY;
  buttonSize: ButtonSize = ButtonSize.MEDIUM;
  buttonClass: ButtonClass = ButtonClass.SUBMIT;

  itemNameFC = new FormControl('', {validators: [Validators.required, Validators.min(3)]});
  itemPriceFC = new FormControl(this.itemPrice, {validators: [Validators.required]});
  itemAmountFC = new FormControl(this.itemAmount, {validators: [Validators.required]});

  itemForm: FormGroup = new FormGroup({
    itemName: this.itemNameFC,
    itemPrice: this.itemPriceFC,
    itemAmount: this.itemAmountFC,
  });

  constructor(private readonly modalService: ModalService,
              private readonly roomItemsService: RoomItemsService) {
  }

  ngOnInit() {
    this.itemPriceFC.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(400),
      filter(val => !!val)
    ).subscribe((value: number) => {
      this.itemPrice = +(value.toFixed(2));
    });
    this.itemAmountFC.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(400),
      filter(val => !!val)
    ).subscribe((value: number) => {
      const amount = +(value.toFixed(0));
      this.itemAmount = amount >= 0 ? amount : 0;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  cancel() {
    this.modalService.closeModal();
  }

  handleSubmit() {
    if (this.itemForm.valid) {
      this.saveForm();
    }
  }

  private saveForm(): void {
    const newItem: RoomItemModel = {
      name: this.itemNameFC.value,
      amountWanted: this.itemAmountFC.value as number,
      amountOwned: 0 as number,
      costPerItem: this.itemPriceFC.value as number,
      totalCost: (this.itemPriceFC.value as number) * (this.itemAmountFC.value as number),
      spendedCost: 0 as number,
      roomId: this.room.id,
      locked: false,
      colors: []
    };

    this.roomItemsService.addItem$(newItem).subscribe(addedItem => {
      this.modalService.closeModal();
    });
  }

  handleNumberInput(keyboardEvent: KeyboardEvent) {
    if (keyboardEvent.key === 'e' || keyboardEvent.key === 'E' || keyboardEvent.key === '+' || keyboardEvent.key === '-') {
      keyboardEvent.preventDefault();
    }
  }
}
