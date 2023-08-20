import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CharacterDetails } from '../models/CharacterDetails';
import { Store } from '@ngrx/store';
import { loadCharacteDetails } from '../store/actions/character-details.actions';
import { CharacterDetailsState } from '../models/CharacterDetailsState';
import { selectCharacterDetails } from '../store/selectors/character-details.selectors';

export const CharacterDetailsResolver: ResolveFn<CharacterDetails | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  store: Store<CharacterDetailsState> = inject(Store<CharacterDetailsState>)
): Observable<CharacterDetails | null> => {
    const characterId: string | null = route.paramMap.get('id');
    if(!characterId) return of(null);
    store.dispatch(loadCharacteDetails({ filters: { characterId: +characterId } }));
    console.log("RESOLVER RES",store.select(selectCharacterDetails))
    return store.select(selectCharacterDetails);
}
