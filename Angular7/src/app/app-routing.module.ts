import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ImagesComponent } from './images/images.component';
import { ImageComponent } from './images/image/image.component';
import { ImageListComponent } from './images/image-list/image-list.component';
import { Constants } from './constants';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: Constants.angularRoutes.redirectTo,
    pathMatch: Constants.angularRoutes.fullPath
  },
  {
    path: Constants.angularRoutes.user,
    component: UserComponent,
    children: [
      {
        path: Constants.angularRoutes.login,
        component: LoginComponent
      }
    ]
  },
  {
    path: Constants.angularRoutes.image, component: ImagesComponent,
    children: [
      {
        path: Constants.angularRoutes.upload,
        component: ImageComponent
      },
      {
        path: Constants.angularRoutes.list,
        component: ImageListComponent
      }
    ]
  },
  {
    path: Constants.angularRoutes.paymentDetail,
    component: PaymentDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Constants.angularRoutes.weather,
    component: WeatherComponent
  },
  {
    path: Constants.angularRoutes.home,
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: Constants.angularRoutes.forbidden,
    component: ForbiddenComponent
  },
  { path: Constants.angularRoutes.adminPanel,
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    data: {
      permittedRoles: [Constants.roles.admin]
    }
  },
  { path: '**', redirectTo: Constants.angularRoutes.home }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
   ],
   exports: [RouterModule]
})
export class AppRoutingModule { }
