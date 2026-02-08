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
    noClickCount: number = 0;
    hintMessage: string = '';

    private hints: string[] = [
        '',
        '',
        '🤔 Are you sure about that?',
        '😅 Come on, you know you want to say Yes!',
        '🙈 The "No" button is shy... try the other one!',
        '💔 This is NOT a valid option!',
        '🎯 Hint: The green button is your friend!',
        '🤷‍♂️ Why are you doing this to yourself?',
        '⚠️ Error 404: "No" option not found!',
        '🎪 Okay, this is just getting silly now...',
        '✨ The universe wants you to click "Yes"!',
        '🚫 "No" is so last year... try "Yes"!'
    ];

    onNoHover() {
        this.noClickCount++;

        // Show hint starting from 2nd click
        if (this.noClickCount >= 2 && this.noClickCount < this.hints.length) {
            this.hintMessage = this.hints[this.noClickCount];
        } else if (this.noClickCount >= this.hints.length) {
            this.hintMessage = this.hints[this.hints.length - 1];
        }

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
