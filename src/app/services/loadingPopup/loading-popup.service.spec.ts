import { TestBed } from '@angular/core/testing';

import { LoadingPopupService } from './loading-popup.service';

describe('LoadingPopupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingPopupService = TestBed.get(LoadingPopupService);
    expect(service).toBeTruthy();
  });
});
