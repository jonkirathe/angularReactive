import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountDownTimerComponent } from '@kirathe/count-down-timer';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, CountDownTimerComponent],
  template: `
    <nav class="navbar navbar-expand-lg navbar-brand bg-color">
      <a class="navbar-brand bg-color" href="#">Angular Reactive</a>
      <count-down-timer
            [countDownTimerTemplate]="timerTemplate"
            [dDay]="date"
          ><ng-template
            #timerTemplate
            let-days="daysToDDay"
            let-hours="hoursToDDay"
            let-minutes="minutesToDDay"
            let-seconds="secondsToDDay"
          >
            <label class="text-danger"
              >Count Down To The Next Release: {{ days }}
              <a class="h6"
                >Day(s) {{ hours }}: {{ minutes }}: {{ seconds }}</a
              ></label
            >
          </ng-template>
        </count-down-timer>
      <button
        class="navbar-toggler"
        type="button"
        (click)="toggleNavbar()"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse flex-row-reverse"
        id="navbarTogglerDemo01"
        [ngClass]="{ show: navbarOpen }"
      >
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <!-- <li class="nav-item active">
            <a class="nav-link" href="#">Signals</a>
          </li>
         -->
        </ul>
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  navbarOpen = false;
  date = new Date('2023-12-06 04:29:40');

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
