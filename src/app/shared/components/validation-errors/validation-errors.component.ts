import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ValidationErrors} from "@angular/forms";
import {KeyValuePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-validation-errors',
  standalone: true,
  imports: [
    KeyValuePipe,
    NgForOf
  ],
  templateUrl: './validation-errors.component.html',
  styleUrl: './validation-errors.component.css'
})
export class ValidationErrorsComponent implements OnChanges {
  @Input() errors: Record<string, ValidationErrors> | null | undefined = null;
  @Input() customErrorMessages: Record<string, string> = {};
  errorMessages: Record<string, string> = {
    required: 'This field is required',
    minlength: 'Minimum length is 5',
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {customErrorMessages} = changes;
    if (customErrorMessages) {
      this.errorMessages = {
        ...this.errorMessages,
        ...customErrorMessages.currentValue
      }
    }
  }

}
