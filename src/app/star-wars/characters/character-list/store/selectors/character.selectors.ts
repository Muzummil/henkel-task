// External Depencies
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CharactersListState } from '../../models/CharactersListState';
// Internal Depencies

/* Select the character detail state from the feature state */
export const selectCharactersListState = createFeatureSelector<CharactersListState>('characters-list');

/* Select the character details from the character detail state */
export const selectCharactersList = createSelector(
  selectCharactersListState,
  (state: CharactersListState) => state.data
);

/* Select the loading status from the character detail state */
export const selectCharactersListLoading = createSelector(
  selectCharactersListState,
  (state: CharactersListState) => state.loading
);

/* Select the error from the character detail state */
export const selectCharactersListError = createSelector(
  selectCharactersListState,
  (state: CharactersListState) => state.error
);
