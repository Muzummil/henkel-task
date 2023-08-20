// External Dependencies
import { Store } from "@ngrx/store";
import { CommonModule } from "@angular/common";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
// Internal Dependencies
import { CustomError } from "@src/app/shared/models/CustomError";
import { CharactersListState } from "../models/CharactersListState";
import { Character, CharactersList } from "../models/CharactersList";
import { CharacterListFilters } from "../models/CharacterListFilters";
import { loadCharactesList } from "../store/actions/character.actions";
import { LoaderComponent } from "@src/app/shared/ui/components/loader/loader.component";
import { StorageService } from "@src/app/shared/data-access/storage-service/storage.service";
import { PaginationComponent } from "@src/app/shared/ui/components/pagination/pagination.component";
import {
  selectCharactersList,
  selectCharactersListError,
  selectCharactersListLoading,
} from "../store/selectors/character.selectors";

@Component({
  selector: "app-characters-list",
  standalone: true,
  imports: [CommonModule, LoaderComponent, PaginationComponent],
  templateUrl: "./character-list.component.html",
  styleUrls: ["./character-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListComponent implements OnInit {
  /** Observable representing the character details */
  charactersList$: Observable<CharactersList | null> | null =
    this._store.select(selectCharactersList);

  /** Observable representing the loading state */
  loading$: Observable<boolean> | null = this._store.select(
    selectCharactersListLoading
  );

  /** Observable representing the error state */
  error$: Observable<CustomError | null> | null = this._store.select(
    selectCharactersListError
  );

  /** Behaviour subject to reactively handle current page with OnPush */
  public currentPage$: BehaviorSubject<number> = new BehaviorSubject(1);

  /** Behaviour subject to reactively handle per page with OnPush */
  public perPage$: BehaviorSubject<number> = new BehaviorSubject(10);

  /** Local storage key to not repeat the name again and again  */
  private CURRENT_PAGE_KEY = "CURRENT_PAGE";

  /** Subscriptions  */
  private queryParamsSubscription: Subscription | undefined;

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _storageService: StorageService,
    private readonly _store: Store<CharactersListState>
  ) {}

  ngOnInit() {
    // Subscribe to query parameter changes
    this.queryParamsSubscription = this._activatedRoute.queryParams.subscribe(
      (params: Params) => {
        this.handleQueryParams(params);
      }
    );
  }

  /**
   * Handles the query params of current page url
   */
  handleQueryParams(params: Params): void {
    // Get query filters from query parameters
    const queryFilters: CharacterListFilters = this.getQueryParamsObj(params);
    // Load characters list using the query filters
    this.loadCharactersList(queryFilters);
  }

  /**
   * Get query parameters and convert them into CharacterListFilters object.
   * @param params The query parameters object from ActivatedRoute.
   * @returns A CharacterListFilters object containing page and limit values.
   */
  getQueryParamsObj(params: Params): CharacterListFilters {
    // Get current page and update BehaviorSubject
    const currentPage = this.getCurrentPage(params);
    this.currentPage$.next(currentPage);
    this._storageService.setItem(this.CURRENT_PAGE_KEY, currentPage.toString());
    // Return query filters object
    return {
      page: currentPage,
      limit: this.getCurrentPerPage(params),
    };
  }

  /**
   * Get the current page number from query parameters or storage.
   * @param params The query parameters object from ActivatedRoute.
   * @returns The current page number.
   */
  private getCurrentPage(params: Params): number {
    if (params["page"]) {
      return params["page"];
    }

    // Get stored current page from storage service or use default
    const storedCurrentPage = this._storageService.getItem(
      this.CURRENT_PAGE_KEY
    );
    return storedCurrentPage ? parseInt(storedCurrentPage) : 1;
  }

  /**
   * Get the current items per page value from query parameters or default.
   * @param params The query parameters object from ActivatedRoute.
   * @returns The current items per page value.
   */
  private getCurrentPerPage(params: Params): number {
    // Use items per page value from query parameters or default value
    return params["limit"] ? parseInt(params["limit"]) : this.perPage$.value;
  }

  /**
   * Load the character details for the given personId
   * @param personId The ID of the character
   */
  loadCharactersList(filters: CharacterListFilters): void {
    this._store.dispatch(loadCharactesList({ filters }));
  }

  /**
   * Page change event
   * @param page number
   */
  onPageChanged(page: number): void {
    this._router.navigateByUrl(
      `star-wars/characters?page=${page}&limit=${this.perPage$.value}`
    );
  }

  /**
   * Navigate to the character details page for the given character
   * @param character The selected character
   */
  gotoCharacterDetails(characterUID: string): void {
    this._router.navigate([`star-wars/character/${characterUID}`]);
  }
  /**
   * Tracks each character of array based on character uid
   * @returns {string} channelId a unique value for each channel
   */
  trackByChacterId(index: number, character: Character): string {
    return character.uid;
  }
  /**
   * On component destroy
   */
  ngOnDestroy() {
    // Unsubscribe from the query parameters subscription
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}
