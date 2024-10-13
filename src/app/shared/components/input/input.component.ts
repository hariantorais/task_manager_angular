import {Component, forwardRef, Input} from '@angular/core';
import {
  FormsModule, ReactiveFormsModule,
} from "@angular/forms";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {ControlValueAccessorDirective} from "../../directives/control-value-accessor.directive";
import {JsonPipe, NgIf} from "@angular/common";
import {ValidationErrorsComponent} from "../validation-errors/validation-errors.component";

type InputType = 'text' | 'number' | 'email' | 'password';

@Component({
  selector: 'app-input',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    JsonPipe,
    ValidationErrorsComponent
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent<T> extends ControlValueAccessorDirective<T> {


  @Input() inputId: string = '';
  @Input() label: string = '';
  @Input() type: InputType = 'text';

  onInputChange(event: any): void{
    const newValue = event.target.value;
    this.value = newValue;
    this.onChange(newValue);
    this.onTouched();
  }

}
