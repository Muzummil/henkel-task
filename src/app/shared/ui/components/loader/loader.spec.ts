// External Dependencies
import { ComponentFixture, TestBed } from '@angular/core/testing';
// Internal Dependencies
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a "loader" class in the template', () => {
    fixture.detectChanges();
    const loaderElement = fixture.nativeElement.querySelector('.loader');
    expect(loaderElement).toBeTruthy();
  });
});
