import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { getTasksResolver } from './get-tasks.resolver';

describe('getTasksResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => getTasksResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
