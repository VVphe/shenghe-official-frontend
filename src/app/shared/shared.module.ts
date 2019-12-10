import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzIconModule } from "ng-zorro-antd";

const SHARED_MODULES = [CommonModule, NzIconModule];

@NgModule({
  declarations: [],
  imports: [SHARED_MODULES],
  exports: [SHARED_MODULES]
})
export class SharedModule {}
