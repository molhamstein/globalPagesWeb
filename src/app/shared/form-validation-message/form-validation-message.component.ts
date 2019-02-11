import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-form-validation-message',
  templateUrl: './form-validation-message.component.html',
  styleUrls: ['./form-validation-message.component.css']
})
export class FormValidationMessageComponent implements OnInit {
  @Input() control
  @Input() messages
  @Input() params
  @Input() form
  constructor(private translate:TranslateService) { }

  ngOnInit() {
    this.messages=Object.entries(this.messages)
    if(this.params){
      Object.keys(this.params).forEach(key=>{
        this.translate.get(this.params[key]).subscribe(value=>this.params[key]=value)
      })
    }
  }

}
