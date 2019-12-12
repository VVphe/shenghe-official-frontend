import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LayoutModule } from "./layout/layout.module";
import { NgZorroAntdModule, NZ_I18N, zh_CN } from "ng-zorro-antd";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import zh from "@angular/common/locales/zh";
import { HomeModule } from "./home/home.module";
import { ContactModule } from "./contact/contact.module";
import { ProductModule } from "./product/product.module";
import { DefaultInjectorService } from "./core/default-injector.service";
import { AboutusModule } from "./aboutus/aboutus.module";

registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HomeModule,
    ContactModule,
    ProductModule,
    AboutusModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DefaultInjectorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
