import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { of } from "rxjs";
import { ApiService } from "./api.service";
import { StorageService } from "../storage-service/storage.service";
import { HttpParams } from "@angular/common/http";

describe("ApiService", () => {
  let service: ApiService;
  let storageService: StorageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService, StorageService],
    });

    service = TestBed.inject(ApiService);
    storageService = TestBed.inject(StorageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should make a GET request with no query parameters", () => {
    const apiUrl = "people";
    const responseData = { data: "test data" };

    service.get(apiUrl).subscribe((response) => {
      expect(response).toEqual(of(responseData));
    });

    const req = httpMock.expectOne(`${service.API_BASE_URL}${apiUrl}`);
    expect(req.request.method).toBe("GET");
    req.flush(responseData);
  });

  it("should make a GET request with query parameters", () => {
    const apiUrl = "people";
    const queryParams = new HttpParams({
      fromObject: {
        page: "1",
        limit: "10",
      },
    });
    const responseData = { data: "test data" };

    service.get(apiUrl, queryParams).subscribe((response) => {
      expect(response).toEqual(responseData);
    });

    const req = httpMock.expectOne(
      `${service.API_BASE_URL}${apiUrl}?limit=10&page=1`
    );
    expect(req.request.method).toBe("GET");
    req.flush(responseData);
  });

  it("should return cached response if available", () => {
    const apiUrl = "people";
    const queryParams = new HttpParams({
      fromObject: {
        page: "1",
        limit: "10",
      },
    });
    const cachedResponse = { data: "cached data" };

    spyOn(storageService, "getItem").and.returnValue(
      JSON.stringify(cachedResponse)
    );

    service.get(apiUrl, queryParams).subscribe((response) => {
      expect(response).toEqual(cachedResponse);
    });

    // No HTTP request should be made
    httpMock.expectNone(`${service.API_BASE_URL}${apiUrl}?limit=10&page=1`);
  });
});
