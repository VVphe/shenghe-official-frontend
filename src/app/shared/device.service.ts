import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DeviceService {
  constructor() {}

  get isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
      navigator.userAgent
    );
  }
}
