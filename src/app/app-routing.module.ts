import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserAuthGuardGuard } from './guards/user-auth-guard.guard';
// import {AdminAuthGuard} from './guards/admin-auth-guard.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FrontSectionComponent } from './front-section/front-section.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BookMovieComponent } from './book-movie/book-movie.component';
import { BookMovieSeatComponent } from './book-movie/book-movie-seat/book-movie-seat.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { OrderDetailComponent } from './user-detail/order-detail/order-detail.component';
import { ChangePasswordComponent } from './user-detail/change-password/change-password.component';
import { AdminComponent } from './admin/admin.component';
import { MovieAdminComponent } from './admin/movie-admin/movie-admin.component';
import { TheaterAdminComponent } from './admin/theater-admin/theater-admin.component';
import { CustomerAdminComponent } from './admin/customer-admin/customer-admin.component';
import { ShowtimeAdminComponent } from './admin/showtime-admin/showtime-admin.component';

const routes: Routes = [
	{
		path: '',
    redirectTo: '/main',
    pathMatch : 'full'
	},
  {
		path: 'main',
		component: FrontSectionComponent,
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'signup',
		component: SignupComponent
	},
	{ path: 'book-movie/:movieId',
		component: BookMovieComponent
	},
  { path: 'book-movie/seats/:movieId/:theaterId/:time/:date',
		component: BookMovieSeatComponent
	},
	{ path: 'user',
		component: UserDetailComponent,
		canActivate: [UserAuthGuardGuard],
		children: [
			{ path: '', redirectTo: 'order-details', pathMatch: 'full'},
      { path: 'order-details', component: OrderDetailComponent },
      { path: 'change-password', component: ChangePasswordComponent}
    ],
	},
	{
		path: 'admin',
		component: AdminComponent,
		children: [
			{ path: '', redirectTo: 'movie-admin', pathMatch: 'full'},
			{ path: 'movie-admin', component: MovieAdminComponent},
			{ path: 'theater-admin', component: TheaterAdminComponent},
			{ path: 'customer-admin', component: CustomerAdminComponent},
			{ path: 'showtime-admin', component: ShowtimeAdminComponent},
		]
	}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
