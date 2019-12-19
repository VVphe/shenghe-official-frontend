import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { SharedModule } from "../shared/shared.module";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { PopContactComponent } from "./pop-contact/pop-contact.component";
import { BackToTopComponent } from "./backToTop/back-to-top.component";

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    PopContactComponent,
    BackToTopComponent
  ],
  imports: [SharedModule, RouterModule, FormsModule],
  exports: [LayoutComponent]
})
export class LayoutModule {}
