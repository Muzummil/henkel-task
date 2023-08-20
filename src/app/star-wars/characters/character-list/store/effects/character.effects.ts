// External Depencies
import { from, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
// Internal Depencies
import { CustomError } from '@app/shared/models/CustomError';
import { ErrorService } from '@app/shared/data-access/error-service/error.service';
import { CharacterListService } from '../../data-access/character-list.service';
import { CharactersList } from '../../models/CharactersList';
import { loadCharactesList, loadCharactesListFailure, loadCharactesListSuccess } from '../actions/character.actions';

@Injectable()
export class CharactesListEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _characterService: CharacterListService,
    private readonly _errorService: ErrorService
  ) {}

  /* Effect to load character details */
  loadCharactersList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadCharactesList), // Listen for loadCharactesList action
      switchMap(({ filters }) =>
        from(
          /* Get character details from the service based on the provided filters */
          this._characterService.getCharactersList(filters)
        ).pipe(
          /* If successful, map the result to a loadCharactesListSuccess action */
          map((charactersList: CharactersList) => {
            return loadCharactesListSuccess({ data: charactersList });
          }),
          /* If there is an error, catch it and return a loadCharactesListFailure action with the error */
          catchError((error: HttpErrorResponse) => {
            const customError: CustomError = {
              errorMessage: this._errorService.getCustomErrorMessage(error)
            };
            return of(loadCharactesListFailure({ error: customError }));
          })
        )
      )
    )
  );
}
