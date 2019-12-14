import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-param-filter",
  templateUrl: "./param-filter.component.html",
  styleUrls: ["./param-filter.component.less"]
})
export class ParamFilterComponent implements OnInit {
  @Output()
  valueChange = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  handleValueChange(value: number[], type: string) {
    console.log(value, type);
    this.valueChange.emit({ value, type });
  }
}
