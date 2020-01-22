import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild
} from "@angular/core";
import { SliderComponent } from "../slider/slider.component";

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

  @ViewChild("powerSlider", { static: false })
  powerSlider: SliderComponent;
  @ViewChild("fluxSlider", { static: false })
  fluxSlider: SliderComponent;

  constructor() {}

  ngOnInit() {}

  handleValueChange(value: number[], type: string) {
    this.valueChange.emit({ value, type });
  }

  reset() {
    this.powerSlider.reset();
    this.fluxSlider.reset();
  }
}
