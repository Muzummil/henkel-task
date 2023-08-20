// External Dependencies
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
// Internal Dependencies
import { CharacterPlannets } from '../models/CharacterPlannets';
import { ApiService } from "@src/app/shared/data-access/api-service/api.service";

@Injectable({
  providedIn: 'platform'
})
export class PlannetService {

  private characterPlannetsApiUrl: string = 'planets/';

  constructor(private readonly _apiService: ApiService) {}

  /**
   * Retrieves the details of a character, including the details of their character.
   * @param plannetId The ID of the plannet of the character.
   * @returns An Observable emitting the character details.
   */
  getPlannetDetails(plannetId: number): Observable<CharacterPlannets> {
    return this._apiService.get<CharacterPlannets>(this.characterPlannetsApiUrl + plannetId)
  }
}
