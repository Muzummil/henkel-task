// External Dependencies
import { of } from "rxjs";
import { Location } from '@angular/common';
import { Store, StoreModule } from "@ngrx/store";
import { SpyLocation } from '@angular/common/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
// Internal Dependencies
import { PlannetDetailsComponent } from "./plannet-details.component";
import { selectPlannetDetails, selectPlannetDetailsError, selectPlannetDetailsLoading } from "../store/selectors/plannet-details.selectors";

describe("PlannetDetailsComponent", () => {
  let component: PlannetDetailsComponent;
  let fixture: ComponentFixture<PlannetDetailsComponent>;
  let mockStore: Partial<Store>;
  let location: SpyLocation;
  
  beforeEach(() => {
    mockStore = {
      select: (selector: any) => {
        if (selector === selectPlannetDetails) {
          return of({ results: [], total_records: 0 });
        } else if (selector === selectPlannetDetailsLoading) {
          return of(false);
        } else if (selector === selectPlannetDetailsError) {
          return of(null);
        }

        // Return an empty observable for other selectors
        return of();
      },
      dispatch: jasmine.createSpy(),
    };

    TestBed.configureTestingModule({
      imports: [
        PlannetDetailsComponent,
        RouterTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [{ provide: Store, useValue: mockStore }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PlannetDetailsComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch loadPlannetDetails action on ngOnInit", () => {
    component.id = "1";
    spyOn(component, "loadPlannetDetails");
    component.ngOnInit();
    expect(component.loadPlannetDetails).toHaveBeenCalledWith(1);
  });

  it('should go back to previous page', () => {
    spyOn(location, 'back');
    component.backToCharacter();
    expect(location.back).toHaveBeenCalled();
  });
});
