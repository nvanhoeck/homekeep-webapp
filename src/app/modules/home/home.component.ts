import {AfterContentInit, Component} from '@angular/core';
import {HeaderService} from '../../shared/skeleton/header';
import {ButtonClass, ButtonSize, ButtonType} from '../../shared/components/buttons';
import {AuthService} from '../../core/services/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterContentInit {

  public tapButtonSize: ButtonSize = ButtonSize.BIG;
  public tapButtonType: ButtonType = ButtonType.SECONDARY;
  public tapButtonClass: ButtonClass = ButtonClass.TEXT;

  private _clickEventHandler = ($event: any) => this.changeButton($event);
  private _changeInputEventHandler = ($event: any) => this.changeInputHandler($event);


  constructor(private readonly headerService: HeaderService,
              private readonly authService: AuthService) {
  }


  ngAfterContentInit(): void {
    this.headerService.mayShowHeader(false);
  }

  get clickEventHandler(): ($event) => void {
    return this._clickEventHandler;
  }

  get changeInputEventHandler(): ($event) => void {
    return this._changeInputEventHandler;
  }

  private changeButton($event: any): void {
    this.tapButtonType = ButtonType.WHITE_BORDER_ONLY;
    const node: any = $event.target;
    node.style.width = '300px';
    node.setAttribute('width', '10rem');
    this.tapButtonClass = ButtonClass.PASSWORD;
  }

  private changeInputHandler(keyValue: string): void {
    if (keyValue.length === 4) {
      this.authService.validate(keyValue);
    }
  }
}

