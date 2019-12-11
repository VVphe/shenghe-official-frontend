import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzIconModule, NzDropDownModule, NzInputModule } from "ng-zorro-antd";

const SHARED_MODULES = [
  CommonModule,
  NzIconModule,
  NzDropDownModule,
  NzInputModule
];

@NgModule({
  declarations: [],
  imports: [SHARED_MODULES],
  exports: [SHARED_MODULES]
})
export class SharedModule {}
