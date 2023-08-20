// External Depencies
import { createReducer, on } from '@ngrx/store';
// Internal Depencies
import { PlannetDetailsState } from '../../models/PlannetDetailsState';
import { loadPlannetDetails, loadPlannetDetailsFailure, loadPlannetDetailsSuccess } from '../actions/plannet-details.actions';

/* Inital state */
export const initialState: PlannetDetailsState = {
  data: null,
  loading: true,
  error: null,
};
/* Reducer for character details state */
export const plannetDetailsReducer = createReducer(
  initialState,
  /* Handle the plannets action */
  on(loadPlannetDetails, (state: PlannetDetailsState) => ({ ...state, loading: true, error: null })),
  /* Handle the plannetsSuccess action */
  on(loadPlannetDetailsSuccess, (state: PlannetDetailsState, { data }) => ({ ...state, data, loading: false })),
  /* Handle the plannetsFailure action */
  on(loadPlannetDetailsFailure, (state: PlannetDetailsState, { error }) => ({ ...state, loading: false, error }))
);
