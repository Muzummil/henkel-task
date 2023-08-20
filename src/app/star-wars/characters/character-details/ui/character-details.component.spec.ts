// External Dependencies
import { of } from "rxjs";
import { Store, StoreModule } from "@ngrx/store";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
// Internal Dependencies
import {
  selectCharacterDetails,
  selectCharacterDetailsError,
  selectCharacterDetailsLoading,
} from "../store/selectors/character-details.selectors";
import { CharacterDetailsComponent } from "./character-details.component";

describe("CharacterDetailsComponent", () => {
  let component: CharacterDetailsComponent;
  let fixture: ComponentFixture<CharacterDetailsComponent>;
  let mockStore: Partial<Store>;

  beforeEach(() => {
    mockStore = {
      select: (selector: any) => {
        if (selector === selectCharacterDetails) {
          return of({ results: [], total_records: 0 });
        } else if (selector === selectCharacterDetailsLoading) {
          return of(false);
        } else if (selector === selectCharacterDetailsError) {
          return of(null);
        }

        // Return an empty observable for other selectors
        return of();
      },
      dispatch: jasmine.createSpy(),
    };

    TestBed.configureTestingModule({
      imports: [
        CharacterDetailsComponent,
        RouterTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [{ provide: Store, useValue: mockStore }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch loadCharactesList action on ngOnInit", () => {
    component.id = "1";
    spyOn(component, "loadCharacterDetails");
    component.ngOnInit();
    expect(component.loadCharacterDetails).toHaveBeenCalledWith(1);
  });

  it("should navigate to characters list page", () => {
    const routerSpy = spyOn(component["_router"], "navigateByUrl");
    localStorage.setItem("CURRENT_PAGE", "1");
    component.backToCharactersList();
    expect(routerSpy).toHaveBeenCalledWith(
      "star-wars/characters?page=1&limit=10",
    );
  });

  it("should navigate to plannet details page", () => {
    const routerSpy = spyOn(component["_router"], "navigate");
    const homeworldURL = "https://www.swapi.tech/api/planets/1";
    component.checkPlannets(homeworldURL);
    expect(routerSpy).toHaveBeenCalledWith(["star-wars/character/plannet/1"]);
  });
});
