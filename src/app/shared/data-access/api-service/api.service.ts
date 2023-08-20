// External Dependencies
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// Internal Dependencies
import { environment } from '@src/environments/environment';
import { StorageService } from '../storage-service/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /**
   * API base URL from environment file
   */
  public API_BASE_URL: string = environment.API_BASE_URL;

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _storageService: StorageService
  ) {}
  /**
   * Call API and retrieve data from the server
   */
  get<T>(apiUrl: string, queryParams?: HttpParams): Observable<T> {
    const API_URL: string = this.removeDoubleSlash(this.removeTrailingSlash(this.API_BASE_URL + apiUrl));
    const cacheKey: string = this.constructCacheKey(API_URL, queryParams);
    const cachedResponse = this.getCachedResponse(cacheKey);

    if (cachedResponse) {
      return of(cachedResponse);
    }

    const request$ = this._httpClient
      .get<T>(API_URL, { params: queryParams })
      .pipe(
        tap((response) => {
          this.setCachedResponse(cacheKey, response);
        })
      );

    return request$;
  }
  /**
   * Remove the double slash from string
   */
  private removeDoubleSlash(str: string): string {
    if(str.includes("//")){
      return str.replaceAll("//", "/")
    }
    return str
  }
  /**
   * Remove trailing slash from string
   */
  private removeTrailingSlash(str: string): string {
    if (str.endsWith('/')) {
      return str.slice(0, -1);
    }
    return str;
  }
  /**
   * Construct a unique cache key based on the API URL and query parameters
   */
  private constructCacheKey(url: string, params?: HttpParams): string {
    if (params) {
      const paramKeys = params.keys().sort();
      const sortedParams = paramKeys
        .map((key) => `${key}=${params.get(key)}`)
        .join('&');
      return `${url}?${sortedParams}`;
    }
    return url;
  }

  /**
   * Get the cached response from localStorage
   */
  private getCachedResponse(cacheKey: string): any | null {
    const cachedData = this._storageService.getItem(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return null;
  }

  /**
   * Set the cached response in localStorage
   */
  private setCachedResponse(cacheKey: string, response: any): void {
    this._storageService.setItem(cacheKey, JSON.stringify(response));
  }
}
