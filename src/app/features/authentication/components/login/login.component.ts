import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {InputComponent} from "../../../../shared/components/input/input.component";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, InputComponent, ReactiveFormsModule, RouterLink, FaIconComponent, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLoading: boolean = false;

  authService = inject(AuthService);
  router = inject(Router);

  errorMessage = {required: 'This field is required', email: 'Please enter a valid email address'}
  error: string = '';

  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });


  login(): void {

    if (this.formGroup.invalid) {
      this.formGroup.markAsTouched();
      return;
    }

    this.isLoading = true;
    this.authService.login(this.formGroup.value).subscribe({
      next: (res) => {
        if (res.status === 'ok') {
          this.authService.storeToken(res.access_token);
          this.router.navigate(['/boards']);
        } else {
          this.error = res.message;
        }
      },
      error: (error) => {
        console.log(error)
        this.error = error;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  protected readonly faSpinner = faSpinner;
}
