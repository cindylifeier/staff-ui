import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "app/user/users/users.component";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";
import {UserCreateEditComponent} from "app/user/user-create-edit/user-create-edit.component";
import {UserResolveService} from "app/user/shared/user-resolve.service";
import {CanDeactivateGuardService} from "../security/shared/can-deactivate-guard.service";
import {UserListComponent} from "./user-list/user-list.component";
import {GenderCodeLookupResolveService} from "./shared/gender-code-lookup-resolve.service";
import {LocaleLookupResolveService} from "./shared/locale-lookup-resolve.service";
import {RoleLookupResolveService} from "app/user/shared/role-lookup-resolve.service";

const userRoutes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
    children: [
      {
        path: '',
        component: UserListComponent
      },
      {
        path: 'create',
        component: UserCreateEditComponent,
        canDeactivate: [CanDeactivateGuardService],
        resolve: {
          genderCodes: GenderCodeLookupResolveService,
          localeCodes: LocaleLookupResolveService,
          roleCodes: RoleLookupResolveService
        }
      },
      {
        path: 'edit/:userId',
        component: UserCreateEditComponent,
        canDeactivate: [CanDeactivateGuardService],
        resolve: {
          user: UserResolveService,
          genderCodes: GenderCodeLookupResolveService,
          localeCodes: LocaleLookupResolveService,
          roleCodes: RoleLookupResolveService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

export const routedComponents = [
  UsersComponent,
  UserListComponent,
  UserCreateEditComponent
];

export const routedResolveServices = [
  UserResolveService,
  GenderCodeLookupResolveService,
  LocaleLookupResolveService,
  RoleLookupResolveService
];
