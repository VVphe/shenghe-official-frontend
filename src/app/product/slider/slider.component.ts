import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

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

  @Input()
  title = "test";

  @Output()
  valueChange = new EventEmitter<number[]>();

  divisionArr: number[];

  value;

  private value$ = new Subject<number[]>();

  constructor() {}

  ngOnInit() {
    this.divisionArr = Array(this.divisions + 1).fill(0);
    this.value$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(value => this.valueChange.emit(value));
  }

  median(min: number, max: number): number {
    return Math.round((min + max) / 2);
  }

  handleValueChange(value: number[]) {
    this.value$.next(value);
  }
}
