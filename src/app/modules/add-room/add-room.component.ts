import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ElementPosition} from '../../shared/models/element-position.enum';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ButtonClass, ButtonSize, ButtonType} from '../../shared/components/buttons';
import {IconModel} from '../../shared/models/icon-model';
import {RoomModel} from '../../shared/models';
import {Router} from '@angular/router';

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
              private readonly router: Router) {
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
    this.saveForm();
    this.router.navigate(['rooms']);
  }

  private saveForm() {
    let rooms = JSON.parse(localStorage.getItem('rooms')) as RoomModel[];
    if (!rooms) {
      rooms = [];
    }

    rooms.push({
        id: 1,
        name: this.roomName.value,
        icon: this.selectedIcon,
        items: []
      } as RoomModel);

    localStorage.setItem('rooms', JSON.stringify(rooms));
  }
}
