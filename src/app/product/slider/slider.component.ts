import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.less"]
})
export class SliderComponent implements OnInit {
  @Input()
  min: number = 0;
  @Input()
  max: number = 250;

  @Input()
  divisions: number = 20;

  divisionArr: number[];

  value;

  constructor() {}

  ngOnInit() {
    this.divisionArr = Array(this.divisions + 1).fill(0);
  }

  median(min: number, max: number): number {
    return Math.round((min + max) / 2);
  }
}
