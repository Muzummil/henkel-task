// External Depencies
import { createReducer, on } from '@ngrx/store';
// Internal Depencies
import { CharacterDetailsState } from '../../models/CharacterDetailsState';
import { loadCharacteDetailsFailure, loadCharacteDetailsSuccess } from '../actions/character-details.actions';

/* Inital state */
export const initialState: CharacterDetailsState = {
  data: null,
  loading: true,
  error: null,
};
/* Reducer for character details state */
export const characterDetailsReducer = createReducer(
  initialState,
  /* Handle the loadCharactesList action */
  on(loadCharacteDetailsFailure, (state: CharacterDetailsState) => ({ ...state, loading: true, error: null })),
  /* Handle the loadCharactesListSuccess action */
  on(loadCharacteDetailsSuccess, (state: CharacterDetailsState, { data }) => ({ ...state, data, loading: false })),
  /* Handle the loadCharactesListFailure action */
  on(loadCharacteDetailsFailure, (state: CharacterDetailsState, { error }) => ({ ...state, loading: false, error }))
);
