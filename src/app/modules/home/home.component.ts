import {AfterContentInit, Component} from '@angular/core';
import {HeaderService} from '../../shared/skeleton/header';
import {ButtonSize, ButtonType} from '../../shared/components/buttons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterContentInit {

  public tapButtonSize: ButtonSize = ButtonSize.BIG;
  public tapButtonType: ButtonType = ButtonType.SECONDARY;

  private _clickEventHandler = () => console.log('');


  constructor(private readonly headerService: HeaderService) {
  }


  ngAfterContentInit(): void {
    this.headerService.mayShowHeader(false);
  }

  get clickEventHandler(): () => void {
    return this._clickEventHandler;
  }

}

