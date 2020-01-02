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
  buttonSize: ButtonSize = ButtonSize.BIG;
  buttonClass: ButtonClass = ButtonClass.ICON;

  constructor(private readonly modalService: ModalService) { }

  ngOnInit() {
  }

  public closeModal(): any {
    return _ => {
      this.modalService.closeModal();
    };
  }
}
