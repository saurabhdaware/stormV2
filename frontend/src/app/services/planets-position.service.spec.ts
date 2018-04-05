import { TestBed, inject } from '@angular/core/testing';

import { PlanetsPositionService } from './planets-position.service';

describe('PlanetsPositionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanetsPositionService]
    });
  });

  it('should be created', inject([PlanetsPositionService], (service: PlanetsPositionService) => {
    expect(service).toBeTruthy();
  }));
});
