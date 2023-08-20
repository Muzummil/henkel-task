import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "star-wars",
  },
  {
    path: "star-wars",
    loadChildren: () =>
      import("./star-wars/star-wars-routes").then((mod) => mod.STAR_WAR_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'star-wars'
  }
];
