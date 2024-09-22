import {Component, HostListener, inject, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {AuthService} from "../../features/authentication/services/auth.service";
import {Title} from "@angular/platform-browser";
import {filter, map} from "rxjs";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  router = inject(Router);
  authService = inject(AuthService);
  isDropdownOpen = false;
  isMobileMenuOpen = false;
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



  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    const isClickInside = document.getElementById('user-menu-button')?.contains(target);
    if (!isClickInside) {
      this.isDropdownOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  closeMobileMenu(event: Event) {
    const target = event.target as HTMLElement;
    const isClickInside = document.getElementById('mobile-menu-button')?.contains(target);
    if (!isClickInside) {
      this.isMobileMenuOpen = false;
    }
  }

  menuItems = [
    {
      title: 'Dashboard',
      link: 'dashboard'
    },
    {
      title: 'User List',
      link: 'user-list'
    },
    {
      title: 'Board',
      link: 'boards'
    }
  ];

  onLogout() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }

}
