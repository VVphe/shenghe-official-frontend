import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout.component";
import { SharedModule } from "../shared/shared.module";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  imports: [SharedModule, RouterModule, FormsModule],
  exports: [LayoutComponent]
})
export class LayoutModule {}
