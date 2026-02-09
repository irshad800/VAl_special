import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackingService } from '../../services/tracking.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  visits: any[] = [];
  loading = true;

  constructor(private trackingService: TrackingService) { }

  ngOnInit(): void {
    this.fetchVisits();
  }

  fetchVisits() {
    this.trackingService.getVisits().subscribe({
      next: (data) => {
        this.visits = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch visits', err);
        this.loading = false;
      }
    });
  }
}
