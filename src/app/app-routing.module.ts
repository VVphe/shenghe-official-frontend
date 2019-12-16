import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "home" },
      {
        path: "home",
        loadChildren: () =>
          import("./home/home.module").then(module => module.HomeModule)
      },
      {
        path: "contact",
        loadChildren: () =>
          import("./contact/contact.module").then(
            module => module.ContactModule
          )
      },
      {
        path: "products",
        loadChildren: () =>
          import("./product/product.module").then(
            module => module.ProductModule
          )
      },
      {
        path: "about",
        loadChildren: () =>
          import("./aboutus/aboutus.module").then(
            module => module.AboutusModule
          )
      },
      {
        path: "news",
        loadChildren: () =>
          import("./news/news.module").then(module => module.NewsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
