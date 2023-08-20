// External Dependencies
import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-loader",
  styleUrls: ["./loader.scss"],
  standalone: true,
  template: `<div data-cy="loader" class="loader"></div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {}
