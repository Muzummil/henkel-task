// External Dependencies
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
// Internal Dependencies
import { CharacterDetails } from "../models/CharacterDetails";
import { CustomError } from "@src/app/shared/models/CustomError";
import { CharacterDetailsState } from "../models/CharacterDetailsState";
import { loadCharacteDetails } from "../store/actions/character-details.actions";
import { LoaderComponent } from "@src/app/shared/ui/components/loader/loader.component";
import { StorageService } from "@src/app/shared/data-access/storage-service/storage.service";
import { UtilityService } from "@src/app/shared/data-access/utility-service/utility.service";
import { selectCharacterDetails, selectCharacterDetailsError, selectCharacterDetailsLoading } from "../store/selectors/character-details.selectors";

@Component({
  selector: "app-characters-details",
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent
  ],
  templateUrl: "./character-details.component.html",
  styleUrls: ["./character-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDetailsComponent implements OnInit {

  /** Character id recieved as URL param */
  @Input({ required: true }) id?: string;
  
  /** Observable representing the character details */
  characterDetails$: Observable<CharacterDetails | null> | null = this._store.select(selectCharacterDetails);

  /** Observable representing the loading state */
  loading$: Observable<boolean> | null = this._store.select(selectCharacterDetailsLoading);

  /** Observable representing the error state */
  error$: Observable<CustomError | null> | null = this._store.select(selectCharacterDetailsError);
  
  constructor(
    private readonly _router: Router,
    private readonly _storageService: StorageService,
    private readonly _store: Store<CharacterDetailsState>,
    private readonly _utilityService: UtilityService
  ) {}

  ngOnInit() {
    if (this.id) {
      this.loadCharacterDetails(parseInt(this.id));
    }
  }

  /**
   * Load details of the character
   */
  loadCharacterDetails(characterId: number): void {
    this._store.dispatch(loadCharacteDetails({ filters: { characterId } }));
  }

  /**
   * Navigate back characters listing page
   */
  backToCharactersList(): void {
    const savedPagination: string | null = this._storageService.getItem("CURRENT_PAGE");
    let characterPageUrl: string = 'star-wars/characters'
    if (savedPagination) {
      characterPageUrl = characterPageUrl + `?page=${savedPagination}&limit=10`;
    }

    this._router.navigateByUrl(characterPageUrl);
  }

  /**
   * Navigate to the character details page for the given character
   * @param character The selected character
   */
  checkPlannets(homeworldURL: string): void {
    const plannetId = this._utilityService.extractIdFromUrl(homeworldURL)
    this._router.navigate([`star-wars/character/plannet/${plannetId}`]);
  }

}

