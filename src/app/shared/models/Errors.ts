export enum ErrorCodes {
    ERROR = 1,
    SUCCESS = 0,
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    UN_AUTHORIZED = 403,
  }
  
  export enum ErrorMessages {
    GENERAL = "Error! Please try Again.",
    NOT_FOUND = "Resource does not exist.",
    UN_AUTHORIZED = "Session expired! Please login again.",
    BAD_REQUEST = "No record found for this selection please try again.",
  }
  