// External Dependencies
import { TestBed } from '@angular/core/testing';
// Internal Dependencies
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get item from localStorage', () => {
    const key = 'testKey';
    const value = 'testValue';
    service.setItem(key, value);
    const retrievedValue = service.getItem(key);
    expect(retrievedValue).toBe(value);
  });

  it('should return null for non-existent item', () => {
    const nonExistentKey = 'nonExistentKey';
    const retrievedValue = service.getItem(nonExistentKey);
    expect(retrievedValue).toBeNull();
  });

  it('should clear all items from localStorage', () => {
    const key = 'testKey';
    const value = 'testValue';
    service.setItem(key, value);
    service.clearAll();
    const retrievedValue = service.getItem(key);
    expect(retrievedValue).toBeNull();
  });
});
