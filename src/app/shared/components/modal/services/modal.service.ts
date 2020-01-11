import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type
} from '@angular/core';
import {ModalComponent} from '../modal.component';
import {InputTupple} from '../../../types/InputTupple';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalComponentRef: ComponentRef<ModalComponent | any>;
  listener: any;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver,
              private readonly appRef: ApplicationRef,
              private readonly injector: Injector) {
  }

  openModal(componentClass: Type<any>, keyValues: InputTupple[]): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const componentRef = componentFactory.create(this.injector);

    this.appRef.attachView(componentRef.hostView);

    const domElemen = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    document.body.appendChild(domElemen);

    this.modalComponentRef = componentRef;
    this.modalComponentRef.instance.injectedType = componentClass;
    this.modalComponentRef.instance.injectedProperties = keyValues;
  }

  closeModal(): void {
    this.appRef.detachView(this.modalComponentRef.hostView);
    this.modalComponentRef.destroy();
    this.listener.modalClosed();
  }


  addListener(listener: any) {
    this.listener = listener;
  }
}
