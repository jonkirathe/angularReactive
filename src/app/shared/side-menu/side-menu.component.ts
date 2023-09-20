import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
      <nav id="sidebar">
        <ul class="list-unstyled components">
        <div class="sidebar-header">
          <h4>SIDEBAR</h4>
          <div class="line"></div>
        </div>
        <li class="active">
            <a href="#">Signals</a>
          </li>
          <li >
            <a
              href="#homeSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              class="dropdown-toggle"
              (click)="toggleNavbar()"
             
              >RXJS</a
            >
            <ul  [ngClass]="{ show: navbarOpen }" class="collapse list-unstyled" id="homeSubmenu">
              <li>
                <a [routerLink]="['/rxjs/subject']" routerLinkActive="router-link-active" >Subject</a>
              </li>
              <li>
                <a [routerLink]="['/rxjs/behaviour-subject']" routerLinkActive="router-link-active">BehavoiurSubject</a>
              </li>
              <li>
                <a [routerLink]="['/rxjs/replay-subject']" routerLinkActive="router-link-active">ReplaySubject</a>
              </li>
              <li>
                <a [routerLink]="['/rxjs/observable']" routerLinkActive="router-link-active">Observables</a>
              </li>
            </ul>
          </li>

          <li>
            <a href="#">About</a>
          </li>
      
          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>

        <ul class="list-unstyled CTAs">
          <li>
            <a href="https://github.com/Jonnykratz/angularReactive" class="download">Download code</a>
          </li>
        </ul>
      </nav>
  `,
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
