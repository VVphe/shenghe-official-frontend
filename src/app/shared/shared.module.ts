import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NzIconModule,
  NzDropDownModule,
  NzInputModule,
  NzSliderModule,
  NzToolTipModule,
  NzPaginationModule
} from "ng-zorro-antd";
import { HttpClientModule } from "@angular/common/http";
import { NzTabsModule } from 'ng-zorro-antd/tabs';

const SHARED_MODULES = [
  CommonModule,
  NzIconModule,
  NzDropDownModule,
  NzInputModule,
  HttpClientModule,
  NzSliderModule,
  NzToolTipModule,
  NzPaginationModule,
  NzTabsModule
];

@NgModule({
  declarations: [],
  imports: [SHARED_MODULES],
  exports: [SHARED_MODULES]
})
export class SharedModule {}
