import {Routes} from '@angular/router';
import {LoginComponent} from "./features/authentication/components/login/login.component";
import {LayoutComponent} from "./shared/layout/layout.component";
import {UserListComponent} from "./features/user/components/user-list/user-list.component";
import {CreateUserComponent} from "./features/user/components/create-user/create-user.component";
import {BoardComponent} from "./features/board/components/board/board.component";
import {authGuard} from "./core/guards/auth.guard";
import {TitleResolver} from "./core/resolvers/title.resolver";
import {ShowBoardComponent} from "./features/board/components/board-show/show-board.component";
import {guestGuard} from "./core/guards/guest.guard";
import {RegisterComponent} from "./features/authentication/components/register/register.component";
import {AuthLayoutComponent} from "./features/authentication/components/auth-layout/auth-layout.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: "full"
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    resolve: {title: TitleResolver},
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data : {
          title: 'Login Form'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data : {
          title: 'Register Form'
        }
      },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    resolve: {title: TitleResolver},
    children: [
      {
        path: 'user-list',
        component: UserListComponent,
        data: {
          title: 'User List'
        }

      },
      {
        path: 'create-user',
        component: CreateUserComponent,
        data: {
          title: 'Create User'
        }
      },
      {
        path: 'edit-user/:id',
        component: CreateUserComponent,
        data: {
          title: 'Edit User'
        }
      },
      {
        path: 'boards',
        component: BoardComponent,
        data: {
          title: 'My Boards'
        }
      },
      {
        path: 'boards/:id',
        component: ShowBoardComponent,
        data: {
          title: 'Show The Board'
        }
      },
    ]
  },
];
