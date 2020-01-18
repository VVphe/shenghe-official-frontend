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
import { SafeHtmlPipe } from "./safe-html.pipe";

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
  declarations: [PopContactComponent, SafeHtmlPipe],
  imports: [SHARED_MODULES],
  exports: [SHARED_MODULES, PopContactComponent, SafeHtmlPipe]
})
export class SharedModule {}
