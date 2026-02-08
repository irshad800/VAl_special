import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-proposal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './proposal.component.html',
    styleUrl: './proposal.component.scss'
})
export class ProposalComponent {
    noBtnStyle: { [key: string]: string } = {};
    showSuccess: boolean = false;

    onNoHover() {
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 50);
        this.noBtnStyle = {
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`,
            transition: 'all 0.2s ease'
        };
    }

    onYesClick() {
        this.showSuccess = true;
        this.triggerConfetti();
    }

    triggerConfetti() {
        // Simple confetti effect using CSS or a library if available.
        // For now, we'll just rely on the success template.
        console.log('Confetti!');
    }
}
