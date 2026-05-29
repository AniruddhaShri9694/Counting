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
  malaCount = 0;

  ngOnInit(): void {
    const savedCount = localStorage.getItem('japCount');
    const savedMala = localStorage.getItem('malaCount');

    if (savedCount) {
      this.count = Number(savedCount);
      this.calculateRemaining();
    }

    if (savedMala) {
      this.malaCount = Number(savedMala);
    }
  }

  increaseCount(): void {
    this.count++;

    // short, snappy vibration pattern for tactile feedback
    try { navigator.vibrate?.([30]); } catch {}

    // Check if we completed a mala (108 japa)
    if (this.count % 108 === 0) {
      this.malaCount++;
      localStorage.setItem('malaCount', this.malaCount.toString());
      
      // Extra vibration feedback for completing a mala
      try { navigator.vibrate?.([100, 50, 100]); } catch {}
    }

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

  getCurrentJapa(): number {
    const japa = this.count % 108;
    return japa === 0 ? 108 : japa;
  }

  resetCount(): void {
    const confirmReset = confirm('Are you sure you want to reset both Japa and Mala counters?');

    if (confirmReset) {
      // vibration feedback for reset action
      try { navigator.vibrate?.([60,30,20]); } catch {}

      this.count = 0;
      this.malaCount = 0;
      this.remaining = 108;

      localStorage.removeItem('japCount');
      localStorage.removeItem('malaCount');
    }
  }
}
