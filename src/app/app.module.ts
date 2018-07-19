import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpModule } from '@angular/http'
import { CookieService } from 'ngx-cookie-service';

import { TOKEN_NAME } from './services/user/auth.constant';
import { UserAuthGuardGuard } from './guards/user-auth-guard.guard';
// import {AdminAuthGuard} from './guards/admin-auth-guard.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FrontSectionComponent } from './front-section/front-section.component';
import { MoviePannelComponent } from './front-section/movie-pannel/movie-pannel.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { BookMovieComponent } from './book-movie/book-movie.component';
import { BookMovieSeatComponent } from './book-movie/book-movie-seat/book-movie-seat.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AdminComponent } from './admin/admin.component';
import { OrderDetailComponent } from './user-detail/order-detail/order-detail.component';
import { ChangePasswordComponent } from './user-detail/change-password/change-password.component';
import { OrderPannelComponent } from './user-detail/order-detail/order-pannel/order-pannel.component';
import { MovieAdminComponent } from './admin/movie-admin/movie-admin.component';
import { TheaterAdminComponent } from './admin/theater-admin/theater-admin.component';
import { CustomerAdminComponent } from './admin/customer-admin/customer-admin.component';
import { ShowtimeAdminComponent } from './admin/showtime-admin/showtime-admin.component';
import { ShowtimeTableComponent } from './admin/showtime-admin/showtime-table/showtime-table.component';
import { CustomerTableComponent } from './admin/customer-admin/customer-table/customer-table.component';
import { TheaterTableComponent } from './admin/theater-admin/theater-table/theater-table.component';
import { MovieTalbeComponent } from './admin/movie-admin/movie-talbe/movie-talbe.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FrontSectionComponent,
    MoviePannelComponent,
    SignupComponent,
    LoginComponent,
    BookMovieComponent,
    BookMovieSeatComponent,
    UserDetailComponent,
    AdminComponent,
    OrderDetailComponent,
    ChangePasswordComponent,
    OrderPannelComponent,
    MovieAdminComponent,
    TheaterAdminComponent,
    CustomerAdminComponent,
    ShowtimeAdminComponent,
    ShowtimeTableComponent,
    CustomerTableComponent,
    TheaterTableComponent,
    MovieTalbeComponent
  ],
  imports: [
		JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
    BrowserModule,
		NgxPaginationModule,
		HttpClientModule,
		AppRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		HttpModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
