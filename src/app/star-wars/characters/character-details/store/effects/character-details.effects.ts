// External Depencies
import { from, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
// Internal Depencies
import { CustomError } from '@app/shared/models/CustomError';
import { ErrorService } from '@app/shared/data-access/error-service/error.service';
import { CharacterDetailsService } from '../../data-access/character-details.service';
import { CharacterDetails } from '../../models/CharacterDetails';
import { loadCharacteDetails, loadCharacteDetailsFailure, loadCharacteDetailsSuccess } from '../actions/character-details.actions';

@Injectable()
export class CharacterDetailsEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _characterService: CharacterDetailsService,
    private readonly _errorService: ErrorService
  ) {}

  /* Effect to load character details */
  loadCharactersDetails$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadCharacteDetails), // Listen for character-details action
      switchMap(({ filters }) =>
        from(
          /* Get character details from the service based on the provided filters */
          this._characterService.getCharacterDetails(filters.characterId)
        ).pipe(
          /* If successful, map the result to a loadCharactesListSuccess action */
          map((characterDetails: CharacterDetails) => {
            return loadCharacteDetailsSuccess({ data: characterDetails });
          }),
          /* If there is an error, catch it and return a loadCharactesListFailure action with the error */
          catchError((error: HttpErrorResponse) => {
            const customError: CustomError = {
              errorMessage: this._errorService.getCustomErrorMessage(error)
            };
            return of(loadCharacteDetailsFailure({ error: customError }));
          })
        )
      )
    )
  );
}
