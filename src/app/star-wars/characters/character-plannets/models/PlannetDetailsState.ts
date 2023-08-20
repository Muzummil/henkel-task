// Internal Depencies
import { CharacterPlannets } from './CharacterPlannets';
import { CustomError } from '@app/shared/models/CustomError';

export interface PlannetDetailsState {
  loading: boolean;
  data: CharacterPlannets | null;
  error: CustomError | null;
}