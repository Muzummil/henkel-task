// External Dependencies
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
// Internal Dependencies
import { CharacterDetails } from '../models/CharacterDetails';
import { ApiService } from "@src/app/shared/data-access/api-service/api.service";

@Injectable({
  providedIn: 'platform'
})
export class CharacterDetailsService {

  private characterDetailsApiUrl: string = 'people/';

  constructor(private readonly _apiService: ApiService) {}

  /**
   * Retrieves the details of a character, including the details of their character.
   * @param characterId The ID of the character.
   * @returns An Observable emitting the character details.
   */
  getCharacterDetails(characterId: number): Observable<CharacterDetails> {
    return this._apiService.get<CharacterDetails>(this.characterDetailsApiUrl + characterId)
  }
}
