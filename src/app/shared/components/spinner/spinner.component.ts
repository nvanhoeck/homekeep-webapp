import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  @Input()
  public name: string;

  constructor(private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show(this.name);
  }

  ngOnDestroy(): void {
    this.spinner.hide(this.name);
  }


}
