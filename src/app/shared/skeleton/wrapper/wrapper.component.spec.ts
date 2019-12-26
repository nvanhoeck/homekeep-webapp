import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperComponent } from './wrapper.component';
import {HeaderModule} from '../header/header.module';
import {FooterModule} from '../footer/footer.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('WrapperComponent', () => {
  let component: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrapperComponent ],
      imports: [
        HeaderModule,
        FooterModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
