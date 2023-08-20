import { TestBed } from '@angular/core/testing';
import { UtilityService } from './utility.service';

describe('UtilityService', () => {
  let service: UtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilityService],
    });
    service = TestBed.inject(UtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should extract ID from URL', () => {
    const url = '/some-path/123/';
    const extractedId = service.extractIdFromUrl(url);
    expect(extractedId).toBe(123);
  });

  it('should return null when extraction fails', () => {
    const invalidUrl = '/invalid-url/';
    const extractedId = service.extractIdFromUrl(invalidUrl);
    expect(extractedId).toBeNull();
  });
});
