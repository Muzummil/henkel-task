// External Dependencies
import { ComponentFixture, TestBed } from '@angular/core/testing';
// Internal Dependencies
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total pages correctly', () => {
    component.totalItems = 23;
    component.itemsPerPage = 10;
    expect(component.totalPages).toBe(3);

    component.totalItems = 25;
    expect(component.totalPages).toBe(3);

    component.totalItems = 5;
    expect(component.totalPages).toBe(1);
  });

  it('should emit page change event on next click', () => {
    component.totalItems = 30;
    component.itemsPerPage = 10;
    component.currentPage = 1;

    const pageChangedSpy = spyOn(component.pageChanged, 'emit');

    component.onNextClick();
    expect(pageChangedSpy).toHaveBeenCalledWith(2);

    component.currentPage = 3;
    component.onNextClick();
    expect(pageChangedSpy).not.toHaveBeenCalledWith(4);
  });

  it('should emit page change event on previous click', () => {
    component.totalItems = 30;
    component.itemsPerPage = 10;
    component.currentPage = 3;

    const pageChangedSpy = spyOn(component.pageChanged, 'emit');

    component.onPrevClick();
    expect(pageChangedSpy).toHaveBeenCalledWith(2);

    component.currentPage = 1;
    component.onPrevClick();
    expect(pageChangedSpy).not.toHaveBeenCalledWith(0);
  });
});
