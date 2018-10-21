import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormValidationMessageComponent} from './form-validation-message/form-validation-message.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),

  ],
  declarations: [FormValidationMessageComponent],
  exports:[FormValidationMessageComponent]
})
export class SharedModule { }
