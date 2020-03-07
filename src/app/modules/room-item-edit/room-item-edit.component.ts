import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {RoomItemModel} from '../../shared/models';
import {RoomItemsService} from '../../core/services/data/roomItems/room-items.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ButtonClass, ButtonSize, ButtonType} from '../../shared/components/buttons';

@Component({
  selector: 'app-room-item-edit',
  templateUrl: './room-item-edit.component.html',
  styleUrls: ['./room-item-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomItemEditComponent implements OnInit {
  item: RoomItemModel;
  alternatives: RoomItemModel[] = [];
  activatedRouteSnapshot: ActivatedRouteSnapshot;
  itemForm: FormGroup;

  buttonType: ButtonType = ButtonType.PRIMARY;
  buttonSize: ButtonSize = ButtonSize.MEDIUM;
  buttonClass: ButtonClass = ButtonClass.SUBMIT;

  constructor(private activatedRoute: ActivatedRoute,
              private readonly roomItemsSerivce: RoomItemsService,
              private cdRef: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRouteSnapshot = this.activatedRoute.snapshot;
    this.roomItemsSerivce.findItemById(Number(this.activatedRouteSnapshot.paramMap.get('id')))
      .then(i => {
        this.item = i;
        this.itemForm = new FormGroup(
          {
            itemName: new FormControl(),
            amountNeeded: new FormControl(),
            amountOwned: new FormControl(),
            price: new FormControl(),
            image: new FormControl(),
            colors: new FormControl(),
            urlLink: new FormControl(),
            locked: new FormControl(),
            alternatives: new FormControl(),
            alternativeOf: new FormControl(),
          },
        );

        this.itemForm.controls.price.valueChanges.subscribe(newValue => {
          this.item.spendedCost = this.item.costPerItem * this.item.amountOwned;
          this.item.totalCost = this.item.costPerItem * this.item.amountWanted;
        });


        if (this.item.alternatives) {
          this.roomItemsSerivce.findAlternatives(this.item.alternatives).then((alternatives) => {
            this.alternatives = alternatives;
          });
        }

        this.cdRef.markForCheck();
      });
  }

  handleSubmit() {
    this.roomItemsSerivce.updateItem(this.item);
    this.router.navigate(['/room', this.item.roomId]).finally();
  }

  cancel() {
    this.router.navigate(['/room', this.item.roomId]).finally();
  }
}
