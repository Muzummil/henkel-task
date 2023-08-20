// External Dependencies
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
// Internal Dependencies
import { CharactersList } from "../models/CharactersList";
import { CharacterListFilters } from "../models/CharacterListFilters";
import { ApiService } from "@src/app/shared/data-access/api-service/api.service";

@Injectable({
  providedIn: "platform",
})
export class CharacterListService {

  private charactersListApiUrl: string = "people";
  
  constructor(private readonly _apiService: ApiService) {}

  /**
   * Retrieves the list of a characters.
   * @param filter for pagination etc.
   * @returns An Observable emitting the characters list.
   */
  getCharactersList(filters: CharacterListFilters): Observable<CharactersList> {
    return this._apiService.get<CharactersList>(
      this.charactersListApiUrl,
      this.urlFromFiltersObj(filters)
    );
  }
  /**
   * Convert filters object to query params
   * @param filterObj CharacterListFilters.
   * @returns HttpParams
   */
  private urlFromFiltersObj(filterObj: CharacterListFilters): HttpParams {
    let params = new HttpParams();

    if (filterObj.page !== undefined) {
      params = params.set("page", filterObj.page.toString());
    }

    if (filterObj.limit !== undefined) {
      params = params.set("limit", filterObj.limit.toString());
    }

    return params;
  }
}
