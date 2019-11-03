import { Directive, Input, SimpleChanges } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[telefoneValidator]'
})
export class TelefoneValidatorDirective {

  @Input() telefoneValidator = true;

  public validate(control: AbstractControl): ValidationErrors {
    let viewValue = control.value ? control.value : '';
    
    // pattern="^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$"
    if(viewValue.length === 14){
      viewValue = control.value.replace(/[^\d]+/g, '');
    }

    if (this.telefoneValidator && viewValue) {
      let erro = { error: viewValue };

      if (viewValue == '')
        return null;

    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onChange = fn;
  }

  private _onChange: () => void;

  ngOnChanges(changes: SimpleChanges): void {
    if ('telefoneValidator' in changes) {
      if (this._onChange) this._onChange();
    }
  }


}
