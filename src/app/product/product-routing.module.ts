import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductComponent } from "./product.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";

const routes: Routes = [
  {
    path: "",
    component: ProductComponent,
    children: [{ path: "detail", component: ProductDetailComponent }]
  }
  // { path: "detail", component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
