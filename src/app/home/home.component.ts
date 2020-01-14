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
  productIndex = 0;

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

  pre() {
    if (this.productIndex > 0) this.productIndex--;
  }

  next() {
    if (this.productIndex < 2) this.productIndex++;
  }
}
