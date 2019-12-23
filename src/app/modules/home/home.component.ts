import {AfterContentInit, Component} from '@angular/core';
import {HeaderService} from '../../core/skeleton/header';
import {ButtonSize, ButtonType} from '../../shared/components/buttons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterContentInit {

  public tapButtonSize: ButtonSize = ButtonSize.MEDIUM;
  public tapButtonType: ButtonType = ButtonType.SECONDARY;

  constructor(private readonly headerService: HeaderService) {
  }


  ngAfterContentInit(): void {
    this.headerService.mayShowHeader(false);
  }

}
