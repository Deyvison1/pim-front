import { FormControl, FormGroup } from '@angular/forms';

export class FormUtil {
  static buildForm(fields: string[] = []): FormGroup {
    const form = new FormGroup({});
    fields.forEach((p) => {
      form.addControl(p, new FormControl(''));
    });
    return form;
  }
}