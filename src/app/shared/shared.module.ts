import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NzIconModule,
  NzDropDownModule,
  NzInputModule,
  NzSliderModule,
  NzToolTipModule,
  NzPaginationModule,
  NzModalModule,
  NzCarouselModule
} from "ng-zorro-antd";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { HttpClientModule } from "@angular/common/http";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { TranslateModule } from "@ngx-translate/core";
import { PopContactComponent } from "./pop-contact/pop-contact.component";
import { FormsModule } from "@angular/forms";

const SHARED_MODULES = [
  CommonModule,
  FormsModule,
  NzIconModule,
  NzDropDownModule,
  NzInputModule,
  HttpClientModule,
  NzSliderModule,
  NzToolTipModule,
  NzPaginationModule,
  NzTabsModule,
  NzModalModule,
  TranslateModule,
  NzCarouselModule,
  NzCollapseModule
];

@NgModule({
  declarations: [PopContactComponent],
  imports: [SHARED_MODULES],
  exports: [SHARED_MODULES, PopContactComponent]
})
export class SharedModule {}
