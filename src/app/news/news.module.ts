import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NewsRoutingModule } from "./news-routing.module";
import { NewsComponent } from "./news.component";
import { NewsCardComponent } from "./news-card/news-card.component";
import { SharedModule } from "../shared/shared.module";
import { NewsDetailComponent } from './news-detail/news-detail.component';

@NgModule({
  declarations: [NewsComponent, NewsCardComponent, NewsDetailComponent],
  imports: [SharedModule, NewsRoutingModule]
})
export class NewsModule {}
