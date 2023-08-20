// External Dependencies
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  /**
   * Extracts the ID present at the end of given URL .
   * @param URL The URL to extract the ID from.
   * @returns The extracted ID as a number, or null if extraction failed.
   */
  extractIdFromUrl(URL: string): number | null {
    const matches = URL.match(/\/(\d+)\/?$/);
    if (matches && matches.length > 1) {
      const id = parseInt(matches[1]);
      if (!isNaN(id)) {
        return id;
      }
    }
    return null;
  }

}
