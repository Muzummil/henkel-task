// External Dependencies
import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";

@Component({
  selector: "app-pagination",
  standalone: true,
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChanged = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onNextClick(): void {
    console.log(this.currentPage, this.totalPages);
    this.currentPage = parseInt(this.currentPage.toString());
    if (this.currentPage < this.totalPages) {
      this.pageChanged.emit(this.currentPage + 1);
    }
  }

  onPrevClick(): void {
    if (this.currentPage > 1) {
      this.currentPage = parseInt(this.currentPage.toString());
      this.pageChanged.emit(this.currentPage - 1);
    }
  }
}
