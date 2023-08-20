// External Depencies
import { createReducer, on } from '@ngrx/store';
import { CharactersListState } from '../../models/CharactersListState';
import { loadCharactesList, loadCharactesListFailure, loadCharactesListSuccess } from '../actions/character.actions';
// Internal Depencies

/* Inital state */
export const initialState: CharactersListState = {
  data: null,
  loading: true,
  error: null,
};
/* Reducer for character details state */
export const charactersListReducer = createReducer(
  initialState,
  /* Handle the loadCharactesList action */
  on(loadCharactesList, (state: CharactersListState) => ({ ...state, loading: true, error: null })),
  /* Handle the loadCharactesListSuccess action */
  on(loadCharactesListSuccess, (state: CharactersListState, { data }) => ({ ...state, data, loading: false })),
  /* Handle the loadCharactesListFailure action */
  on(loadCharactesListFailure, (state: CharactersListState, { error }) => ({ ...state, loading: false, error }))
);
