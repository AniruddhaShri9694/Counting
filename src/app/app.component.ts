import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  count = 0;
  remaining = 108;
  pulsing = false;

  ngOnInit(): void {
    const saved = localStorage.getItem('japCount');

    if (saved) {
      this.count = Number(saved);
      this.calculateRemaining();
    }
  }

  increaseCount(): void {
    this.count++;

    // short, snappy vibration pattern for tactile feedback
    try { navigator.vibrate?.([30]); } catch {}

    localStorage.setItem('japCount', this.count.toString());

    this.calculateRemaining();
  }

  animate(): void {
    this.pulsing = true;
    setTimeout(() => this.pulsing = false, 380);
  }

  calculateRemaining(): void {
    this.remaining = 108 - (this.count % 108);

    if (this.remaining === 108) {
      this.remaining = 0;
    }
  }

  resetCount(): void {
    const confirmReset = confirm('Are you sure you want to reset?');

    if (confirmReset) {
      // vibration feedback for reset action
      try { navigator.vibrate?.([60,30,20]); } catch {}

      this.count = 0;
      this.remaining = 108;

      localStorage.removeItem('japCount');
    }
  }
}