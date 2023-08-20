// External Dependencies
import { Route } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { importProvidersFrom } from "@angular/core";
// Internal Dependencies
import { PlannetService } from "./characters/character-plannets/data-access/plannet.service";
import { CharactesListEffects } from "./characters/character-list/store/effects/character.effects";
import { charactersListReducer } from "./characters/character-list/store/reducers/character.reducer";
import { CharacterListService } from "./characters/character-list/data-access/character-list.service";
import { CharacterDetailsService } from "./characters/character-details/data-access/character-details.service";
import { PlannetDetailsEffects } from "./characters/character-plannets/store/effects/plannet-details.effects";
import { plannetDetailsReducer } from "./characters/character-plannets/store/reducers/plannet-details.reducer";
import { CharacterDetailsEffects } from "./characters/character-details/store/effects/character-details.effects";
import { characterDetailsReducer } from "./characters/character-details/store/reducers/character-details.reducer";

export const STAR_WAR_ROUTES: Route[] = [
  {
    path: "",
    redirectTo: "characters",
    pathMatch: "full",
  },
  /** Characters List */
  {
    path: "characters",
    loadComponent: () =>
      import("./characters/character-list/ui/character-list.component").then(
        (m) => m.CharacterListComponent
      ),
    providers: [
      CharacterListService,
      importProvidersFrom(
        StoreModule.forFeature("characters-list", charactersListReducer),
        EffectsModule.forFeature([CharactesListEffects])
      ),
    ],
  },
  /** Character Details */
  {
    path: "character/:id",
    loadComponent: () =>
      import(
        "./characters/character-details/ui/character-details.component"
      ).then((m) => m.CharacterDetailsComponent),
    providers: [
      CharacterDetailsService,
      importProvidersFrom(
        StoreModule.forFeature("character-details", characterDetailsReducer),
        EffectsModule.forFeature([CharacterDetailsEffects])
      ),
    ],
  },
  /** Character Plannet Details */
  {
    path: "character/plannet/:id",
    loadComponent: () =>
      import(
        "./characters/character-plannets/ui/plannet-details.component"
      ).then((m) => m.PlannetDetailsComponent),
    providers: [
      PlannetService,
      importProvidersFrom(
        StoreModule.forFeature("plannet-details", plannetDetailsReducer),
        EffectsModule.forFeature([PlannetDetailsEffects])
      ),
    ],
  },
];
