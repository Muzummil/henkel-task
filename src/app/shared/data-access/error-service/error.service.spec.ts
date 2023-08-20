import { TestBed } from '@angular/core/testing';
import { ErrorService } from './error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorCodes, ErrorMessages } from '@app/shared/models/Errors';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorService],
    });
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get custom error message for UN_AUTHORIZED', () => {
    const httpError = new HttpErrorResponse({ status: ErrorCodes.UN_AUTHORIZED });
    const errorMessage = service.getCustomErrorMessage(httpError);
    expect(errorMessage).toBe(ErrorMessages.UN_AUTHORIZED);
  });

  it('should get custom error message for NOT_FOUND', () => {
    const httpError = new HttpErrorResponse({ status: ErrorCodes.NOT_FOUND });
    const errorMessage = service.getCustomErrorMessage(httpError);
    expect(errorMessage).toBe(ErrorMessages.NOT_FOUND);
  });

  it('should handle empty message property', () => {
    const httpError = new HttpErrorResponse({ status: 403 });
    const errorMessage = service.getCustomErrorMessage(httpError);
    expect(errorMessage).toBe('Session expired! Please login again.');
  });
});
