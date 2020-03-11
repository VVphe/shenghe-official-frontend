import { Component, OnInit } from "@angular/core";
import { ContactService } from "../shared/contact.service";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.less"]
})
export class ContactComponent implements OnInit {
  contactInfo = {
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    company: "",
    position: "",
    comments: ""
  };

  mustFields = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "E-mail address",
    // telephone: "Telephone number",
    comments: "Comments"
  };

  constructor(
    private contactService: ContactService,
    private msg: NzMessageService
  ) {}

  ngOnInit() {}

  contact() {
    for (let field in this.mustFields) {
      if (!this.contactInfo[field]) {
        this.msg.info(`Please fill out ${this.mustFields[field]}`);
        return;
      }
    }

    this.contactService.submitContact(this.contactInfo).subscribe(_ => {
      this.msg.success("Thank you");
    });
  }
}
