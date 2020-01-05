import {Component, OnInit} from '@angular/core';
import {ButtonClass, ButtonSize, ButtonType} from '../../../shared/components/buttons';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.scss']
})
export class AddItemModalComponent implements OnInit {
  buttonType: ButtonType = ButtonType.PRIMARY;
  buttonSize: ButtonSize = ButtonSize.MEDIUM;
  buttonClass: ButtonClass = ButtonClass.SUBMIT;

  constructor() { }

  ngOnInit() {
  }

}
