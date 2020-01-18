import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: "safeHtml"
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private st: DomSanitizer) {}

  transform(value): any {
    return this.st.bypassSecurityTrustHtml(value);
  }
}
