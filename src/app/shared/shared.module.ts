import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NzIconModule,
  NzDropDownModule,
  NzInputModule,
  NzSliderModule,
  NzToolTipModule,
  NzPaginationModule,
  NzModalModule
} from "ng-zorro-antd";
import { HttpClientModule } from "@angular/common/http";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { TranslateModule } from "@ngx-translate/core";

const SHARED_MODULES = [
  CommonModule,
  NzIconModule,
  NzDropDownModule,
  NzInputModule,
  HttpClientModule,
  NzSliderModule,
  NzToolTipModule,
  NzPaginationModule,
  NzTabsModule,
  NzModalModule,
  TranslateModule
];

@NgModule({
  declarations: [],
  imports: [SHARED_MODULES],
  exports: [SHARED_MODULES]
})
export class SharedModule {}
