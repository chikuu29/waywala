import { TestBed } from '@angular/core/testing';

import { ECommerceServicesService } from './e-commerce-services.service';

describe('ECommerceServicesService', () => {
  let service: ECommerceServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ECommerceServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
