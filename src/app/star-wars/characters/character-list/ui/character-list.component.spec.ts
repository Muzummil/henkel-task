// External Dependencies
import { of } from "rxjs";
import { Store, StoreModule } from "@ngrx/store";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
// Internal Dependencies
import {
  selectCharactersList,
  selectCharactersListError,
  selectCharactersListLoading,
} from "../store/selectors/character.selectors";
import { CharacterListComponent } from "./character-list.component";

describe("CharacterListComponent", () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let mockStore: Partial<Store>;

  beforeEach(() => {
    mockStore = {
      select: (selector: any) => {
        if (selector === selectCharactersList) {
          return of({ results: [], total_records: 0 });
        } else if (selector === selectCharactersListLoading) {
          return of(false);
        } else if (selector === selectCharactersListError) {
          return of(null);
        }

        // Return an empty observable for other selectors
        return of();
      },
      dispatch: jasmine.createSpy(),
    };

    TestBed.configureTestingModule({
      imports: [
        CharacterListComponent,
        RouterTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [{ provide: Store, useValue: mockStore }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch loadCharactesList action on ngOnInit", () => {
    spyOn(component, "loadCharactersList");
    component.ngOnInit();
    expect(component.loadCharactersList).toHaveBeenCalled();
  });

  it("should handle query parameters and dispatch loadCharactesList action", () => {
    spyOn(component, "loadCharactersList");
    const queryParams = { page: 2, limit: 20 };
    component.handleQueryParams(queryParams);
    expect(component.loadCharactersList).toHaveBeenCalledWith({
      page: 2,
      limit: 20,
    });
  });

  it("should navigate to character details page", () => {
    const routerSpy = spyOn(component["_router"], "navigate");
    const characterUID = "character123";
    component.gotoCharacterDetails(characterUID);
    expect(routerSpy).toHaveBeenCalledWith([
      "star-wars/character/character123",
    ]);
  });

  it("should navigate to the correct URL when page changes", () => {
    const routerSpy = spyOn(component["_router"], "navigateByUrl");
    const newPage = 3;

    component.onPageChanged(newPage);

    expect(routerSpy).toHaveBeenCalledWith(
      `star-wars/characters?page=${newPage}&limit=${component.perPage$.value}`
    );
  });
});
