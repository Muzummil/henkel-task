// External Depencies
import { from, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
// Internal Depencies
import { CustomError } from '@app/shared/models/CustomError';
import { PlannetService } from '../../data-access/plannet.service';
import { CharacterPlannets } from '../../models/CharacterPlannets';
import { ErrorService } from '@app/shared/data-access/error-service/error.service';
import { loadPlannetDetails, loadPlannetDetailsFailure, loadPlannetDetailsSuccess } from '../actions/plannet-details.actions';

@Injectable()
export class PlannetDetailsEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _errorService: ErrorService,
    private readonly _plannetService: PlannetService,
  ) {}

  /* Effect to load character details */
  loadPlannetDetails$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadPlannetDetails), // Listen for character-details action
      switchMap(({ filters }) =>
        from(
          /* Get character details from the service based on the provided filters */
          this._plannetService.getPlannetDetails(filters.plannetId)
        ).pipe(
          /* If successful, map the result to a loadCharactesListSuccess action */
          map((plannets: CharacterPlannets) => {
            return loadPlannetDetailsSuccess({ data: plannets });
          }),
          /* If there is an error, catch it and return a loadCharactesListFailure action with the error */
          catchError((error: HttpErrorResponse) => {
            const customError: CustomError = {
              errorMessage: this._errorService.getCustomErrorMessage(error)
            };
            return of(loadPlannetDetailsFailure({ error: customError }));
          })
        )
      )
    )
  );
}
