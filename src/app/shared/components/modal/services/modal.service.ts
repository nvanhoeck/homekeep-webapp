import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector
} from '@angular/core';
import {ModalComponent} from '../modal.component';
import {InputTupple} from '../../../types/InputTupple';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalComponentRef: ComponentRef<ModalComponent | any>;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver,
              private readonly appRef: ApplicationRef,
              private readonly injector: Injector) {
  }

  openModal(componentClass: any, keyValues: InputTupple[]): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);

    const componentRef = componentFactory.create(this.injector);

    this.appRef.attachView(componentRef.hostView);

    const domElemen = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    document.body.appendChild(domElemen);

    this.modalComponentRef = componentRef;

    this.modalComponentRef.instance.injectedType = componentClass;

    const instance = this.modalComponentRef.instance;
    instance.listener = this;
    keyValues.forEach(tupple => {
      _.set(this.modalComponentRef.instance, tupple.attributePath, tupple.value);
    });
  }

  closeModal(): void {
    this.appRef.detachView(this.modalComponentRef.hostView);
    this.modalComponentRef.destroy();
  }
}
