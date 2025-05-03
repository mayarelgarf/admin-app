import { TestBed } from '@angular/core/testing';

import { NotificationHttpService } from './notification-http.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('NotificationHttpService', () => {
  let service: NotificationHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[ provideHttpClient(),provideHttpClientTesting()]
    });
    service = TestBed.inject(NotificationHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
