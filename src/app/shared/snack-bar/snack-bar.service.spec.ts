import { TestBed } from '@angular/core/testing';

import { SnackbarService } from './snack-bar.service';

describe('SnackBarService', () => {
  let service: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
