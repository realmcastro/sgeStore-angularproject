import { TestBed } from '@angular/core/testing';

import { LoginResolver } from './login-resolver.service';

describe('LoginResolverService', () => {
  let service: LoginResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
