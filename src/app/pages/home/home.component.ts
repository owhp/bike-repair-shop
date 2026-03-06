import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features = [
    {
      icon: '🔧',
      title: 'Expert Repairs',
      description: 'Professional bike repair services by certified technicians'
    },
    {
      icon: '⚡',
      title: 'Quick Turnaround',
      description: 'Fast and efficient service to get you back on the road'
    },
    {
      icon: '💰',
      title: 'Fair Pricing',
      description: 'Competitive prices with transparent cost estimates'
    },
    {
      icon: '✓',
      title: 'Quality Guarantee',
      description: 'All repairs come with our satisfaction guarantee'
    }
  ];
}
