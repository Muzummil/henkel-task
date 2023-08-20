// External Dependencies
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  /**
   * Set key,value pair in localStorge
   * @param {string} key, @param {string} value
   */
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
  /**
   * Get value based on key from localStorge
   * @param {string} key
   * @returns {string | null} value based on existance
   */
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }
  /**
   * Clears all the values in localStorage
   */
  clearAll(): void {
    localStorage.clear();
  }
}
