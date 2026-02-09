import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrackingService } from './services/tracking.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HttpClientModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    title = 'valentine-app';

    constructor(private trackingService: TrackingService) { }

    ngOnInit() {
        this.trackingService.trackVisit().subscribe({
            next: (res) => console.log('Visit tracked'),
            error: (err) => console.error('Tracking failed', err)
        });
    }
}
