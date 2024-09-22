import {Component, Input, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent implements OnInit{
  @Input() errorCode: number = 0;

  errorStatus: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
   switch (this.errorCode) {
     case 401:
       this.errorStatus = 'Unauthorized';
       this.errorMessage = 'You are not authorized to access this resource';
       break;

     case 403:
       this.errorStatus = 'Forbidden';
       this.errorMessage = 'You do not have permission to access this resource';
       break;

     case 404:
       this.errorStatus = 'Not Found';
       this.errorMessage = 'The requested resource was not found';
       break;

     case 500:
       this.errorStatus = 'Internal Server Error';
       this.errorMessage = 'An internal server error occurred';
       break;

     default:
       this.errorStatus = 'Unknown Error';
       this.errorMessage = 'An unknown error occurred';
       break;
   }
  }

}
