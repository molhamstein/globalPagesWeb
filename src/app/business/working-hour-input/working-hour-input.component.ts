import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-working-hour-input',
  templateUrl: './working-hour-input.component.html',
  styleUrls: ['./working-hour-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WorkingHourInputComponent),
      multi: true
    }
  ],
})
export class WorkingHourInputComponent implements OnInit, ControlValueAccessor {

  constructor() {

  }
  _value
  set value(v){
    this._value=[];
    this.onChanged(v)
  }
  get value() :any []{
    return this._value
  }
  from=''
  to=''
  day=''
  ngOnInit() {
  }
  add(){
    if(this.from=='' || this.to=='' || this.day=='')
      return
    this.value.unshift({
      from:this.from,
      to:this.to,
      day:this.day,
    })
    this.from=''
    this.to=''
    this.day=''
    this.onChanged(this._value)
  }
  remove(i){
    this.value.splice(i,1)
  }
  onChanged=(v)=>{}
  onTouched=()=>{}

  registerOnChange(fn: any): void {
    this.onChanged=fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched=fn
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    if(Array.isArray(obj))
      this._value=obj
    else
      this.value=[]
  }

}
