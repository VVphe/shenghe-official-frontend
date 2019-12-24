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
    telephone: "Telephone number",
    comments: "Comments"
  };

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

    this.contactService.submitContact(this.contactInfo).subscribe(_ => {
      this.msg.success("Thank you");
    });
  }
}
