import {Component, inject, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Title} from "@angular/platform-browser";
import {filter, map} from "rxjs";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent implements OnInit {
  router = inject(Router);
  authService = inject(AuthService);
  titleService = inject(Title);

  pageTitle: string = '';
  user: any = JSON.parse(this.authService.getUser());

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.router.routerState.root;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route.snapshot.data['title'];
      })
    ).subscribe((title: string | undefined) => {
      this.pageTitle = title || 'Default Title';
      this.titleService.setTitle(this.pageTitle);
    });

    let route = this.router.routerState.root;
    while(route.firstChild){
      route = route.firstChild;
    }
    this.pageTitle = route.snapshot.data['title'] || 'Default Title';
    this.titleService.setTitle(this.pageTitle);
  }
}
