import {
  AfterViewInit,
  ChangeDetectorRef,
  Compiler,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnChanges,
  OnDestroy,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ButtonClass, ButtonSize, ButtonType} from '../buttons';
import {ModalService} from './services/modal.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('target', {read: ViewContainerRef, static: false}) target;

  public injectedType: Type<any> | any;
  public injectedProperties: ComponentPropertyModel[];

  buttonType: ButtonType = ButtonType.PRIMARY;
  buttonSize: ButtonSize = ButtonSize.MEDIUM;
  buttonClass: ButtonClass = ButtonClass.ICON;

  compRef: ComponentRef<any>;
  private isViewInitialized = false;

  public listener: ModalService;

  constructor(private readonly compiler: Compiler,
              private readonly cdRef: ChangeDetectorRef,
              private readonly componentFactoryResolver: ComponentFactoryResolver) {
  }

  updateComponent() {
    if (!this.isViewInitialized) {
      return;
    }
    if (this.compRef) {
      this.compRef.destroy();
    }

    const factory = this.componentFactoryResolver.resolveComponentFactory(this.injectedType);
    this.compRef = this.target.createComponent(factory);

    if (this.injectedProperties) {
      for (const property of this.injectedProperties) {
        _.set(this.compRef.instance, property.key, property.value);
      }
    }

    this.cdRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.isViewInitialized = true;
    this.updateComponent();
  }

  ngOnChanges() {
    this.updateComponent();
  }

  ngOnDestroy() {
    if (this.compRef) {
      this.compRef.destroy();
    }
  }


  public closeModal(): any {
    return () => {
      this.listener.closeModal();
    };
  }
}

export interface ComponentPropertyModel {
  key: string;
  value: any;
}
