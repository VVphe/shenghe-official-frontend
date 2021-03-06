import { Component, OnInit } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd";
import { TranslateService } from "@ngx-translate/core";
import { ContactService } from "src/app/shared/contact.service";

@Component({
  selector: "app-pop-contact",
  templateUrl: "./pop-contact.component.html",
  styleUrls: ["./pop-contact.component.less"]
})
export class PopContactComponent implements OnInit {
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

  get emailErr() {
    return this.contactInfo.email && !this.validEmail(this.contactInfo.email);
  }

  constructor(
    private msg: NzMessageService,
    private contactService: ContactService,
    private translate: TranslateService
  ) {}

  ngOnInit() {}

  contact() {
    for (let field in this.mustFields) {
      if (!this.contactInfo[field]) {
        this.msg.info(`Please fill out ${this.mustFields[field]}`);
        return;
      }
    }

    if (!this.emailErr) {
      return;
    }

    this.contactService.submitContact(this.contactInfo).subscribe(_ => {
      this.msg.success("Thank you");
    });
  }

  validEmail(email) {
    const reg = new RegExp(
      "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
    );
    return reg.test(email);
  }
}
