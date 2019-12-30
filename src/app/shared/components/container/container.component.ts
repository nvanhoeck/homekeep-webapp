import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {StyleBuilderClass} from '../../models/style-builder.class';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent implements OnInit {

  @Input() height: string;
  @Input() maxHeight: string;
  @Input() maxWidth: string;
  @Input() width: string;

  constructor(private readonly cdRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  public getStyles(): any {
    this.cdRef.markForCheck();
    return new StyleBuilderClass()
      .withHeight(this.height)
      .withWidth(this.width);
  }
}
