import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let svc: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    svc = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(svc).toBeTruthy();
  });

  it('should expose environment object', () => {
    expect(svc.getEnvironment()).toBeTruthy();
  });
});
