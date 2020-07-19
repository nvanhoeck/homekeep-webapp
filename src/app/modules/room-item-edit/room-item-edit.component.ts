import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {RoomItemModel} from '../../shared/models';
import {RoomItemsService} from '../../core/services/data/roomItems/room-items.service';
import {ButtonClass, ButtonSize, ButtonType, CPPosition} from '../../shared/components/buttons';
import {FormControl, FormGroup} from '@angular/forms';
import {RoomItemColor} from '../../shared/models/room-item-color';
import {ImageTransformerService} from '../../core/services/image/image-transformer.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {MessagingService} from '../../core/services/messaging/messaging.service';
import {AppMessageType} from '../../shared/models/app-message.class';

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
  defaultType: ButtonType = ButtonType.DEFAULT;
  buttonSizeMed: ButtonSize = ButtonSize.MEDIUM;
  buttonSizeSmall: ButtonSize = ButtonSize.SMALL;
  buttonClassSubmit: ButtonClass = ButtonClass.SUBMIT;
  buttonClassEdit: ButtonClass = ButtonClass.ICON;
  defaultClass: ButtonClass = ButtonClass.TEXT;
  colorPickerClass: ButtonClass = ButtonClass.COLOR_PICKER;

  editElement: string;
  cpPositionTopRight: CPPosition = CPPosition.TOP_RIGHT;
  cpPositionTop: CPPosition = CPPosition.TOP;
  cpPositionTopLeft: CPPosition = CPPosition.TOP_LEFT;

  constructor(private activatedRoute: ActivatedRoute, private readonly messagingService: MessagingService,
              private readonly roomItemsSerivce: RoomItemsService,
              private cdRef: ChangeDetectorRef, private readonly  imageTransformerService: ImageTransformerService,
              private router: Router, private readonly sanitizer: DomSanitizer) {
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
    this.updateAllFields();
  }

  private updateAllFields() {
    this.item.spendedCost = this.item.amountOwned * this.item.costPerItem;
    this.item.totalCost = this.item.amountWanted * this.item.costPerItem;
    this.roomItemsSerivce.updateItem$(this.item).subscribe(updated => {
      this.router.navigate(['/room', this.item.roomId]).finally();
    });
  }

  cancel() {
    this.router.navigate(['/room', this.item.roomId]).finally();
  }

  saveInput(keyboardEvent: KeyboardEvent) {
    if (keyboardEvent.key === 'Enter') {
      this.editElement = null;
    }
  }

  addAmountNeeded() {
    this.item.amountWanted += 1;
  }

  reduceAmountNeeded() {
    if (this.item.amountWanted > 1) {
      this.item.amountWanted -= 1;
      if (this.item.amountOwned > this.item.amountWanted) {
        this.item.amountOwned = this.item.amountWanted;
      }
    }
  }

  addAmountOwned() {
    this.item.amountOwned += 1;
    if (this.item.amountOwned > this.item.amountWanted) {
      this.item.amountWanted = this.item.amountOwned;
    }
  }

  reduceAmountOwned() {
    if (this.item.amountOwned > 0) {
      this.item.amountOwned -= 1;
    }
  }

  handleNumberInput(keyboardEvent: KeyboardEvent) {
    if (keyboardEvent.key === 'e' || keyboardEvent.key === 'E' || keyboardEvent.key === '+' || keyboardEvent.key === '-') {
      keyboardEvent.preventDefault();
    }
  }

  openUrl($event: MouseEvent) {
    if (!!this.item.urlLink) {
      window.open(this.item.urlLink, '_blank');
      $event.preventDefault();
    } else {
      $event.preventDefault();
    }
  }

  setColor(indx: number, id: number, color: string): void {
    this.item.colors[indx] = {id, value: color, roomItem: this.item.colors[indx].roomItem} as RoomItemColor;
    this.cdRef.markForCheck();
  }

  addImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (!file) {
      this.messagingService.addMessage('No image selected', 'edit-image', AppMessageType.ERROR);
    }
    if (file.size >= 1048576) {
      this.messagingService.addMessage('Image too big', 'edit-image', AppMessageType.ERROR);
    } else {
      this.messagingService.clear();
      this.cdRef.markForCheck();
      this.imageTransformerService.convertImage(file).then(img => {
        this.item.image = img;
        this.cdRef.markForCheck();
      });
    }
  }

  getImageHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/x-png;base64,' + this.item.image);
  }

  clickImage() {
    document.getElementById('imageUpload').click();
  }
}
