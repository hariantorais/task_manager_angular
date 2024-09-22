import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {InputComponent} from "../../../../shared/components/input/input.component";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, InputComponent, ReactiveFormsModule, RouterLink, FaIconComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLoading : boolean = false;

  authService = inject(AuthService);
  router = inject(Router);

  errorMessage = {required: 'This field is required'}

  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });



  login(){
    this.isLoading = true;
    this.authService.login(this.formGroup.value).subscribe((res:any)=>{
      if(res.access_token){
        this.authService.storeToken(res.access_token);
        this.authService.storeUser(res.data);
        this.router.navigate(['boards'])
        this.isLoading = false;
      } else {
        alert(res.message);
      }
    });
  }

  protected readonly faSpinner = faSpinner;
}
