import {AfterContentInit, Component} from '@angular/core';
import {HeaderService} from '../../core/skeleton/header';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterContentInit {

  constructor(private readonly headerService: HeaderService) {
  }


  ngAfterContentInit(): void {
    this.headerService.mayShowHeader(false);
  }

}
