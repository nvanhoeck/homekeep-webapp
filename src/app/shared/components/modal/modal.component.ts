import {Component, OnInit} from '@angular/core';
import {ButtonClass, ButtonSize, ButtonType} from '../buttons';
import {ModalService} from './services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  buttonType: ButtonType = ButtonType.PRIMARY;
  buttonSize: ButtonSize = ButtonSize.MEDIUM;
  buttonClass: ButtonClass = ButtonClass.ICON;

  public listener: ModalService;

  constructor() {
  }

  ngOnInit() {
  }

  public closeModal(): any {
    return _ => {
      this.listener.closeModal();
    };
  }
}
