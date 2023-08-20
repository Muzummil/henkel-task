// External Depencies
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PlannetDetailsState } from '../../models/PlannetDetailsState';
// Internal Depencies

/* Select the Plannet detail state from the feature state */
export const selectPlannetDetailsState = createFeatureSelector<PlannetDetailsState>('plannet-details');

/* Select the character details from the character detail state */
export const selectPlannetDetails = createSelector(
  selectPlannetDetailsState,
  (state: PlannetDetailsState) => state.data
);

/* Select the loading status from the Plannet detail state */
export const selectPlannetDetailsLoading = createSelector(
  selectPlannetDetailsState,
  (state: PlannetDetailsState) => state.loading
);

/* Select the error from the Plannet detail state */
export const selectPlannetDetailsError = createSelector(
  selectPlannetDetailsState,
  (state: PlannetDetailsState) => state.error
);
