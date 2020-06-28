import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ElementPosition} from '../../shared/models/element-position.enum';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ButtonClass, ButtonSize, ButtonType} from '../../shared/components/buttons';
import {IconModel} from '../../shared/models/icon-model';
import {RoomModel} from '../../shared/models';
import {Router} from '@angular/router';
import {RoomService} from '../../core/services/data/rooms/room.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRoomComponent implements OnInit {
  roomName = new FormControl('',
    {validators: [Validators.required, Validators.min(3)]}
  );
  icon = new FormControl('');
  roomForm = new FormGroup({
    roomName: this.roomName,
    icon: this.icon,
  });
  addRoomValidationClass = 'add-room';

  public submitButtonSize: ButtonSize = ButtonSize.MEDIUM;
  public submitButtonType: ButtonType = ButtonType.PRIMARY;
  public submitButtonClass: ButtonClass = ButtonClass.SUBMIT;
  public selectedIcon = '';
  public validationClass = this.roomName;


  titlePosition: ElementPosition = ElementPosition.TOP;


// TODO refactor to factory
  icons: IconModel[] = [
    {
      name: 'bed'
    },
    {
      name: 'books'
    },
    {
      name: 'box'
    },
    {
      name: 'camera'
    },
    {
      name: 'display'
    },
    {
      name: 'droplet'
    },
    {
      name: 'gift'
    },
    {
      name: 'glass'
    },
    {
      name: 'headphones'
    },
    {
      name: 'home'
    },
    {
      name: 'key'
    },
    {
      name: 'keyboard'
    },
    {
      name: 'library'
    },
    {
      name: 'mic'
    },
    {
      name: 'microwave'
    },
    {
      name: 'newspaper'
    },
    {
      name: 'oven'
    },

    {
      name: 'paint-format'
    },
    {
      name: 'pencil'
    },
    {
      name: 'printer'
    },
    {
      name: 'refrigerator'
    },
    {
      name: 'trophy'
    },
    {
      name: 'tv'
    },
    {
      name: 'washing-machine'
    },

  ];

  constructor(private readonly cdRef: ChangeDetectorRef,
              private readonly router: Router,
              private readonly roomsService: RoomService) {
  }

  ngOnInit() {
  }

  public selectIcon(icon: IconModel): void {
    this.selectedIcon = icon.name;
    this.roomForm.controls.icon.setValue(icon.name);
    this.cdRef.markForCheck();
  }

  public isSelected(icon: IconModel): boolean {
    this.cdRef.markForCheck();
    return icon.name === this.selectedIcon;
  }

  public handleSubmit(): void {
    if (this.roomForm.valid) {
      this.saveForm();
    }
  }

  public cancel(): void {
    this.navigateToRoomsOverview();
  }

  private navigateToRoomsOverview(): void {
    this.router.navigate(['rooms']).finally();
  }

  private saveForm(): void {
    const room = {
      name: this.roomName.value,
      icon: this.selectedIcon,
      items: []
    } as RoomModel;

    this.roomsService.addRoom$(room).subscribe(newRoom => {
      this.navigateToRoomsOverview();
    });
  }
}
