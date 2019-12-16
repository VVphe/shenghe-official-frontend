import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-param-filter",
  templateUrl: "./param-filter.component.html",
  styleUrls: ["./param-filter.component.less"]
})
export class ParamFilterComponent implements OnInit {
  @Output()
  valueChange = new EventEmitter<any>();

  @Input()
  tooltipStatus = "always";

  constructor() {}

  ngOnInit() {}

  handleValueChange(value: number[], type: string) {
    console.log(value, type);
    this.valueChange.emit({ value, type });
  }
}
