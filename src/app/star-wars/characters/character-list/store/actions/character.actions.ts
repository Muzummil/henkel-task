// External Depencies
import { createAction, props } from "@ngrx/store";
// Internal Depencies
import { CharactersList } from "../../models/CharactersList";
import { CustomError } from "@src/app/shared/models/CustomError";
import { CharacterListFilters } from "../../models/CharacterListFilters";

// Action to load character details with provided filters
export const loadCharactesList = createAction(
  "[CharactersList] Load Characters List",
  props<{ filters: CharacterListFilters}>()
);

// Action dispatched when character details are successfully loaded
export const loadCharactesListSuccess = createAction(
  "[CharacterDetail] Load Character Details Success",
  props<{ data: CharactersList }>()
);

// Action dispatched when loading character details fails
export const loadCharactesListFailure = createAction(
  "[CharacterDetail] Load Character Details Failure",
  props<{ error: CustomError }>()
);
