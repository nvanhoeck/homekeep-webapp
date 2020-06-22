import {TestBed} from '@angular/core/testing';

import {HeaderService} from './header.service';
import {take} from 'rxjs/operators';

describe('HeaderService', () => {
  let service: HeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {}
    );
    service = TestBed.get(HeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('mayShowHeader', () => {
    it('should emit a true if shownHeader is true', () => {
      service.mayShowHeader(true);
      service.getShowHeader$.pipe(take(1))
        .subscribe(value => expect(value).toBeTruthy());
    });

    it('should emit a false if shownHeader is false', () => {
      service.mayShowHeader(false);
      service.getShowHeader$.pipe(take(1))
        .subscribe(value => expect(value).toBeFalsy());
    });
  });
});
