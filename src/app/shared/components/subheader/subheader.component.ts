import {Component, Input, OnInit} from '@angular/core';
import {ElementPosition} from '../../models/element-position.enum';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})
export class SubheaderComponent implements OnInit {
  @Input() title: string;
  @Input() icon: string;
  @Input() iconPosition: ElementPosition;

  constructor() {
  }

  ngOnInit() {
  }

  public determineIconPosition(): any {
    if (this.iconPosition && this.iconPosition === ElementPosition.CENTER) {
      return {
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'flex-start'
      };
    } else {
      return {};
    }
  }

  public determineTextPosition(): any {
    if (this.iconPosition === ElementPosition.CENTER) {
      return {
        display: 'none'
      };
    }
    return {};
  }
}
