import { Component, OnInit } from "@angular/core";
import { MENUS } from "../menus";
import { DeviceService } from "src/app/shared/device.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.less"]
})
export class FooterComponent implements OnInit {
  menus: any[];

  constructor(private deviceService: DeviceService) {}

  get isMobile() {
    return this.deviceService.isMobile;
  }

  ngOnInit() {
    this.menus = MENUS;
  }
}
