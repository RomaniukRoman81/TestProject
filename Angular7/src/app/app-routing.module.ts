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

const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full'},
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'image', component: ImagesComponent,
    children: [
      { path: 'upload', component: ImageComponent},
      { path: 'list', component: ImageListComponent}
    ]
  },
  { path: 'paymentDetail', component: PaymentDetailsComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'adminPanel', component: AdminPanelComponent, canActivate: [AuthGuard],
                        data: { permittedRoles: ['Admin'] }}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
   ],
   exports: [RouterModule]
})
export class AppRoutingModule { }
