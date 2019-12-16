import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-news-card",
  templateUrl: "./news-card.component.html",
  styleUrls: ["./news-card.component.less"]
})
export class NewsCardComponent implements OnInit {
  @Input()
  thumbnail: string;
  @Input()
  title: string;
  @Input()
  abstract: string;
  @Input()
  date: string;

  constructor() {}

  ngOnInit() {}

  formatTimestamp(timestamp) {
    let date = new Date(timestamp);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    return `${y}.${m < 10 ? "0" + m : m}.${d < 10 ? "0" + d : d}`;
  }
}
