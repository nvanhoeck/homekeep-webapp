import {AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HeaderService} from '../header';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperComponent implements OnInit, AfterContentInit {

  constructor(private readonly headerService: HeaderService,
              private readonly cdRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  get showHeader(): Observable<boolean> {
    return this.headerService.getShowHeader();
  }

  ngAfterContentInit(): void {
    this.cdRef.detectChanges();
  }

}
