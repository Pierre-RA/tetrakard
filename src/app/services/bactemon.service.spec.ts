import { TestBed, inject } from '@angular/core/testing';

import { BactemonService } from './bactemon.service';

describe('BactemonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BactemonService]
    });
  });

  it('should be created', inject([BactemonService], (service: BactemonService) => {
    expect(service).toBeTruthy();
  }));
});
