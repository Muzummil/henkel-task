// External Dependencies
import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
// Internal Dependencies
import { ErrorCodes, ErrorMessages } from "@app/shared/models/Errors";

@Injectable({
  providedIn: "root",
})
export class ErrorService {
  /**
   * Captilize the first word of a string
   * @param {string} string of words
   * @returns {string} string of words
   */
  private titleCaseWord(word: string): string {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
  /**
   * Get the custom error message based on status code
   * @param {HttpErrorResponse} httpError
   * @returns {string} custom error message
   */
  getCustomErrorMessage(httpError: HttpErrorResponse): string {
    switch (httpError["status"]) {
      case ErrorCodes.UN_AUTHORIZED:
        return ErrorMessages.UN_AUTHORIZED;
      case ErrorCodes.NOT_FOUND:
        return ErrorMessages.NOT_FOUND;
      default:
        return httpError.message
          ? this.titleCaseWord(httpError.message)
          : ErrorMessages.GENERAL;
    }
  }
}
