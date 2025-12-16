import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { MyAppointmentsComponent } from './pages/my-appointments/my-appointments.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { BookingConfirmationComponent } from './pages/booking-confirmation/booking-confirmation.component';
import { SelectServiceComponent } from './booking/select-service/select-service.component';
import { ChooseDatetimeComponent } from './booking/choose-datetime/choose-datetime.component';
import { ContactDetailsComponent } from './booking/contact-details/contact-details.component';
import { ReviewConfirmComponent } from './booking/review-confirm/review-confirm.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'book',
    children: [
      { path: 'select-service', component: SelectServiceComponent },
      { path: 'choose-datetime', component: ChooseDatetimeComponent },
      { path: 'contact-details', component: ContactDetailsComponent },
      { path: 'review-confirm', component: ReviewConfirmComponent },
      { path: '', redirectTo: 'select-service', pathMatch: 'full' }
    ]
  },
  {
    path: 'booking-confirmation',
    component: BookingConfirmationComponent
  },
  {
    path: 'my-appointments',
    component: MyAppointmentsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [adminGuard]
  },
  { path: '**', redirectTo: '' }
];
