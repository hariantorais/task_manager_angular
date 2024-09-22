import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {IUser} from "../../../../core/models/user.model";
import {UserService} from "../../services/user.service";
import {InputComponent} from "../../../../shared/components/input/input.component";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    InputComponent,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
  router = inject(Router);
  userService = inject(UserService);
  activateRoute = inject(ActivatedRoute);
  currentId: number = 0;
  method: string = 'create';

  errorMessages = {required: 'This field is required', minlength: 'Minimum length is 5'}

  constructor() {
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((res: any) => {
      this.currentId = res.id
      if (res.id) {
        this.getUserById(res.id);
      }
    })

  }

  onSubmit() {
    if(this.formGroup.valid){
      const formData: IUser = this.formGroup.value as IUser;

      if (this.method === 'create') {
        this.userService.storeUser(formData).subscribe(
          (res: any) => {
            if(res){
              this.router.navigate(['user-list']);
            } else {
              alert('Something went wrong');
            }
          },
          (error: any) => console.error('Error', error)
        );
      } else {
        this.onUpdate(this.currentId, formData);
      }
    } else {
      console.log('invalid form');
    }
  }

  getUserById(id: number): void {
    this.userService.getUser(id).subscribe((res: any) => {
      this.method = 'edit';
      const userData: IUser = res.data as IUser;
      this.formGroup.patchValue({
        name: userData.name,
        email: userData.email,
        password: ''
      })
    })
  }

  onUpdate(id: number, formData: IUser): void {
    delete formData.password;
    this.userService.updateUser(id, formData).subscribe(
      (res: any) => {
        if(res){
          this.router.navigate(['user-list']);
        } else {
          alert('Something went wrong');
        }
      }
    );
  }

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl(''),
  })

}
