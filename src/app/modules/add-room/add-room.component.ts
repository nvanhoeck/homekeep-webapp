import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ElementPosition} from '../../shared/models/element-position.enum';
import {FormControl, FormGroup} from '@angular/forms';
import {ButtonClass, ButtonSize, ButtonType} from '../../shared/components/buttons';
import {IconModel} from '../../shared/models/icon-model';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRoomComponent implements OnInit {

  public submitButtonSize: ButtonSize = ButtonSize.MEDIUM;
  public submitButtonType: ButtonType = ButtonType.PRIMARY;
  public submitButtonClass: ButtonClass = ButtonClass.TEXT;
  public selectedIcon = '';


  titlePosition: ElementPosition = ElementPosition.TOP;

  roomForm = new FormGroup({
    roomName: new FormControl(''),
    icon: new FormControl(''),
  });
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

  constructor(private readonly cdRef: ChangeDetectorRef) {
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
}
