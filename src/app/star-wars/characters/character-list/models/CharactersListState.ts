// Internal Depencies
import { CharactersList } from './CharactersList';
import { CustomError } from '@app/shared/models/CustomError';

export interface CharactersListState {
  loading: boolean;
  data: CharactersList | null;
  error: CustomError | null;
}
