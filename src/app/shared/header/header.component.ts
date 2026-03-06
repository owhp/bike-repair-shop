import { Component, OnInit, OnDestroy, inject } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);

  currentUser: User | null = null;
  private userSubscription?: Subscription;

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe(
      user => this.currentUser = user
    );
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }
}
