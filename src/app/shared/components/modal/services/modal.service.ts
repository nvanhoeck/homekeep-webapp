import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector
} from '@angular/core';
import {ModalComponent} from '../modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalComponentRef: ComponentRef<ModalComponent | any>;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver,
              private readonly appRef: ApplicationRef,
              private readonly injector: Injector) {
  }

  openModal(data: any, componentClass: any): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);

    const componentRef = componentFactory.create(this.injector);

    this.appRef.attachView(componentRef.hostView);

    const domElemen = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    document.body.appendChild(domElemen);

    this.modalComponentRef = componentRef;

    this.modalComponentRef.instance.injectedType = componentClass;

    const instance = this.modalComponentRef.instance;
    instance.listener = this;
  }

  closeModal(): void {
    this.appRef.detachView(this.modalComponentRef.hostView);
    this.modalComponentRef.destroy();
  }
}
