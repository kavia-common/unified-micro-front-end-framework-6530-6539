import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';

declare const jasmine: any;

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ConfigService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should report unauthenticated when no token', () => {
    const ls: any = {
      getItem: () => null
    };
    // @ts-ignore override global in test scope
    (globalThis as any).localStorage = ls;
    jasmine.spyOn(ls, 'getItem').and.callThrough();
    expect(service.hasToken()).toBeFalse();
  });
});
