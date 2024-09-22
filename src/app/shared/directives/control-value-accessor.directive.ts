import {Directive, Inject, Injector, OnInit} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControl,
  Validators
} from "@angular/forms";
import {distinctUntilChanged, startWith, Subject, takeUntil, tap} from "rxjs";

@Directive({
  selector: '[appControlValueAccessor]',
  standalone: true
})
export class ControlValueAccessorDirective<T>
  implements ControlValueAccessor, OnInit {

  control!: FormControl | undefined;
  isRequired = false;
  private _isDisabled = false;
  private _destroy$ = new Subject<void>();
  private _onTouched!: () => T;

  value: string = '';



  constructor(@Inject(Injector) private injector: Injector) {
  }


  ngOnInit(): void {
    this.setFormControl();
    this.isRequired = this.control?.hasValidator(Validators.required) ?? false;
  }

  setFormControl() {
    try {
      const formControl = this.injector.get(NgControl);
      switch (formControl.constructor) {
        case FormControlName:
          this.control = this.injector.get(FormGroupDirective).getControl(formControl as FormControlName)
          break;
        default:
          this.control = (formControl as FormControlDirective).form as FormControl;
          break;
      }
    } catch (err) {
      this.control = new FormControl();
    }

  }

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  writeValue(value: T): void {
    if (this.control) {
      if (this.control.value !== value) {
        this.control.setValue(value, { emitEvent: false });
      }
    } else {
      this.control = new FormControl(value);
    }
  }

  registerOnTouched(fn: () => (T)): void {
    this.onTouched = fn;
  }

  registerOnChange(fn: (val: T | null) => T): void {
    this.control?.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        startWith(this.control?.value),
        distinctUntilChanged(),
        tap((val) => fn(val))
      ).subscribe(() => this.control?.markAsUntouched())
  }


  setDisabledState?(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
    if(this.control){
      isDisabled ? this.control.disable() : this.control.enable()
    }
  }

  handleInput(value: string) {
    this.value = value;
    this.onChange(value);
  }

}
