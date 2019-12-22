import { Component, OnInit, HostListener } from "@angular/core";
import { TimeInterval } from "rxjs/internal/operators/timeInterval";

@Component({
  selector: "app-back-to-top",
  templateUrl: "./back-to-top.component.html",
  styleUrls: ["./back-to-top.component.less"]
})
export class BackToTopComponent implements OnInit {
  isVisible = false;

  get showBackTopBtn() {
    return document.documentElement.scrollTop > 200;
  }

  @HostListener("window:scroll", [])
  onScrollChange() {}

  constructor() {}

  ngOnInit() {}

  backToTop() {
    let iSpeed = 0;
    let iTimer;
    clearInterval(iTimer);
    iTimer = setInterval(() => {
      const heightTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      iSpeed = Math.floor((0 - heightTop) / 8);
      document.documentElement.scrollTop = heightTop + iSpeed;
      if (document.documentElement.scrollTop <= 0) {
        clearInterval(iTimer);
      }
    }, 30);
  }
}
