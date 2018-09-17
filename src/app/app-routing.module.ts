import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserAuthGuardGuard } from './guards/user-auth-guard.guard';
import { AdminAuthGuardGuard } from './guards/admin-auth-guard.guard';

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
import { OrdersAdminComponent } from './admin/orders-admin/orders-admin.component';
import { EditMovieComponent } from './admin/movie-admin/movie-talbe/edit-movie/edit-movie.component';
import { DetailMovieComponent } from './admin/movie-admin/movie-talbe/detail-movie/detail-movie.component';
import { AddMovieComponent } from './admin/movie-admin/add-movie/add-movie.component';
import { EditTheaterComponent } from './admin/theater-admin/theater-table/edit-theater/edit-theater.component';
import { AddShowtimeComponent } from './admin/showtime-admin/add-showtime/add-showtime.component';
import { CustomerOrderComponent } from './admin/customer-admin/customer-table/customer-order/customer-order.component';
import { BookSuccessComponent } from './book-movie/book-movie-seat/book-success/book-success.component';
import { AddShowtimeTableComponent } from './admin/showtime-admin/add-showtime/add-showtime-table/add-showtime-table.component';
import { OrderGuardComponent } from './guards/order-guard/order-guard.component';

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
		canActivate: [UserAuthGuardGuard],
		component: BookMovieSeatComponent
	},
	{
		path: 'book-success',
		component: BookSuccessComponent
	},
	{
		path: 'user',
		component: UserDetailComponent,
		canActivate: [UserAuthGuardGuard],
		children: [
			{ path: '', redirectTo: 'order-details', pathMatch: 'full'},
      { path: 'order-details', component: OrderDetailComponent },
      { path: 'change-password', component: ChangePasswordComponent}
    ],
	},
	{
		path: 'order-error',
		component: OrderGuardComponent
	},
	{
		path: 'admin',
		component: AdminComponent,
		// canActivate: [AdminAuthGuardGuard],
		children: [
			{ path: '', redirectTo: 'orders-admin', pathMatch: 'full'},
			{ path: 'orders-admin', component: OrdersAdminComponent},
			{ path: 'movie-admin', component: MovieAdminComponent},
			{ path: 'theater-admin', component: TheaterAdminComponent},
			{ path: 'customer-admin', component: CustomerAdminComponent},
			{ path: 'showtime-admin', component: ShowtimeAdminComponent}
		]
	},
	{
		path: 'movie-detail/:movieId',
		// canActivate: [AdminAuthGuardGuard],
		component: DetailMovieComponent
	},
	{
		path: 'movie-edit/:movieId',
		// canActivate: [AdminAuthGuardGuard],
	 	component: EditMovieComponent
	},
	{
		path: 'movie-add',
		// canActivate: [AdminAuthGuardGuard],
	 	component: AddMovieComponent
	},
	{
		path: 'theater-edit/:theaterId',
		// canActivate: [AdminAuthGuardGuard],
	 	component: EditTheaterComponent
	},
	{
		path: 'showtime-add',
		// canActivate: [AdminAuthGuardGuard],
	 	component: AddShowtimeComponent
	},
	{
		path: 'customer-order/:userId',
		// canActivate: [AdminAuthGuardGuard],
		component: CustomerOrderComponent
	}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
