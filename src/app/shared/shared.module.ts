import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormValidationMessageComponent } from './components/form-validation-message/form-validation-message.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
  ],
  declarations: [FormValidationMessageComponent],
  exports: [FormValidationMessageComponent]
})
export class SharedModule { }
