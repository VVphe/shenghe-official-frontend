import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-back-to-top",
  templateUrl: "./back-to-top.component.html",
  styleUrls: ["./back-to-top.component.less"]
})
export class BackToTopComponent implements OnInit {
  isVisible = false;
  constructor() {}

  ngOnInit() {}
}
