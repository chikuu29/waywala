import { TestBed } from '@angular/core/testing';

import { AppInitializationServiceServiceService } from './app-initialization-service-service.service';

describe('AppInitializationServiceServiceService', () => {
  let service: AppInitializationServiceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppInitializationServiceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
