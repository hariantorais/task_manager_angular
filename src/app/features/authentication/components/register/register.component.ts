import {Component, inject} from '@angular/core';
import {InputComponent} from "../../../../shared/components/input/input.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCheck, faCheckCircle, faSpinner} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    RouterLink,
    FaIconComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  authService = inject(AuthService);

  isRegistered: boolean = false;
  isLoading = false;

  errorMessage = {required: 'This field is required'}

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

  register(){
    this.isLoading = true;
    this.authService.register(this.formGroup.value).subscribe((res:any)=>{
      if (res){
        this.isRegistered = true;
        this.isLoading = false;
      }
    })
  }

  protected readonly faCheck = faCheck;
  protected readonly faSpinner = faSpinner;
  protected readonly faCheckCircle = faCheckCircle;
}
