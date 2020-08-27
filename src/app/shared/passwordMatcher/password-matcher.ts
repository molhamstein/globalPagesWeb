import {AbstractControl, ValidationErrors} from '@angular/forms';

export function passwordMatcher(first,second) {
  return (control: AbstractControl): ValidationErrors | null =>{
    if(first && second)
    {
      var f=control.get(first)
      var s=control.get(second)
      if(f&&s&&f.value&&s.value&&f.value!=s.value)
      {
        return{
          passwordMatcher:true
        }
      }
    }
    return undefined;
  }

}
