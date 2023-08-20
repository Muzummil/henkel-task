// External Depencies
import { createAction, props } from "@ngrx/store";
// Internal Depencies
import { CustomError } from "@src/app/shared/models/CustomError";
import { CharacterPlannets } from "../../models/CharacterPlannets";
import { PlannetDetailsFilters } from "../../models/PlannetDetailsFilters";

// Action to load character details with provided filters
export const loadPlannetDetails = createAction(
  "[PlannetDetails] Load Plannet Details",
  props<{ filters: PlannetDetailsFilters }>()
);

// Action dispatched when character details are successfully loaded
export const loadPlannetDetailsSuccess = createAction(
  "[PlannetDetails] Load Plannet Details Success",
  props<{ data: CharacterPlannets }>()
);

// Action dispatched when loading character details fails
export const loadPlannetDetailsFailure = createAction(
  "[PlannetDetails] Load Plannet Details Failure",
  props<{ error: CustomError }>()
);
