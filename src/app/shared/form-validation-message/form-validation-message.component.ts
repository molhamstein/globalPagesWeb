import {Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-form-validation-message',
  templateUrl: './form-validation-message.component.html',
  styleUrls: ['./form-validation-message.component.css']
})
export class FormValidationMessageComponent implements OnInit {
  @Input() control
  @Input() messages
  constructor() { }

  ngOnInit() {
    this.messages=Object.entries(this.messages)
  }

}
