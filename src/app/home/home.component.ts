import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DeviceService } from "../shared/device.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"]
})
export class HomeComponent implements OnInit {
  isVisible = false;

  get isMobile() {
    return this.deviceService.isMobile;
  }

  constructor(private router: Router, private deviceService: DeviceService) {}

  ngOnInit() {}

  toProduct(category) {
    this.router.navigate(["/products"], {
      queryParams: {
        category
      }
    });
  }
}
