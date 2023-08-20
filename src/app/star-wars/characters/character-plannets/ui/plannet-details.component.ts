// External Dependencies
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { Location, CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
// Internal Dependencies
import { CustomError } from "@src/app/shared/models/CustomError";
import { PlannetDetailsState } from "../models/PlannetDetailsState";
import { CharacterPlannets } from "../models/CharacterPlannets";
import { loadPlannetDetails } from "../store/actions/plannet-details.actions";
import { LoaderComponent } from "@src/app/shared/ui/components/loader/loader.component";
import { selectPlannetDetails, selectPlannetDetailsError, selectPlannetDetailsLoading } from "../store/selectors/plannet-details.selectors";

@Component({
  selector: "app-plannet-details",
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent
  ],
  templateUrl: "./plannet-details.component.html",
  styleUrls: ["./plannet-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannetDetailsComponent implements OnInit {

  /** Character id recieved as URL param */
  @Input({ required: true }) id?: string;
  
  /** Observable representing the character details */
  plannetDetails$: Observable<CharacterPlannets | null> | null = this._store.select(selectPlannetDetails);

  /** Observable representing the loading state */
  loading$: Observable<boolean> | null = this._store.select(selectPlannetDetailsLoading);

  /** Observable representing the error state */
  error$: Observable<CustomError | null> | null = this._store.select(selectPlannetDetailsError);
  
  constructor(
    private readonly _router: Router,
    private readonly _location: Location,
    private readonly _store: Store<PlannetDetailsState>,
  ) {}

  ngOnInit() {
    if (this.id) {
      this.loadPlannetDetails(parseInt(this.id));
    }
  }

  /**
   * Load details of the character
   */
  loadPlannetDetails(plannetId: number): void {
    this._store.dispatch(loadPlannetDetails({ filters: { plannetId } }));
  }

  /**
   * Navigate back characters listing page
   */
  backToCharacter(): void {
    // this._router.navigate([`star-wars/character/${characterUID}`]);
    this._location.back();
  }

}

