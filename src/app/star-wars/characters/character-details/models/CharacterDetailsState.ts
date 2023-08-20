// Internal Depencies
import { CharacterDetails } from './CharacterDetails';
import { CustomError } from '@app/shared/models/CustomError';

export interface CharacterDetailsState {
  loading: boolean;
  data: CharacterDetails | null;
  error: CustomError | null;
}