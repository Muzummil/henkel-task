// External Depencies
import { createAction, props } from "@ngrx/store";
// Internal Depencies
import { CharacterDetails } from "../../models/CharacterDetails";
import { CustomError } from "@src/app/shared/models/CustomError";
import { CharacterDetailsFilters } from "../../models/CharacterDetailsFilters";

// Action to load character details with provided filters
export const loadCharacteDetails = createAction(
  "[CharacteDetails] Load Characters Details",
  props<{ filters: CharacterDetailsFilters }>()
);

// Action dispatched when character details are successfully loaded
export const loadCharacteDetailsSuccess = createAction(
  "[CharacterDetails] Load Character Details Success",
  props<{ data: CharacterDetails }>()
);

// Action dispatched when loading character details fails
export const loadCharacteDetailsFailure = createAction(
  "[CharacterDetails] Load Character Details Failure",
  props<{ error: CustomError }>()
);
