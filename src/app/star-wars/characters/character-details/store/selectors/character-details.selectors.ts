// External Depencies
import { createSelector, createFeatureSelector } from '@ngrx/store';
// Internal Depencies
import { CharacterDetailsState } from '../../models/CharacterDetailsState';

/* Select the character detail state from the feature state */
export const selectCharacterDetailsState = createFeatureSelector<CharacterDetailsState>('character-details');

/* Select the character details from the character detail state */
export const selectCharacterDetails = createSelector(
  selectCharacterDetailsState,
  (state: CharacterDetailsState) => state.data
);

/* Select the loading status from the character detail state */
export const selectCharacterDetailsLoading = createSelector(
  selectCharacterDetailsState,
  (state: CharacterDetailsState) => state.loading
);

/* Select the error from the character detail state */
export const selectCharacterDetailsError = createSelector(
  selectCharacterDetailsState,
  (state: CharacterDetailsState) => state.error
);
