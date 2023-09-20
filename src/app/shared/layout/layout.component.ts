import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { SideMenuComponent } from "../side-menu/side-menu.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  template: `
    <div>
      <app-header></app-header>
    </div>     
      <body>
    <div class="wrapper">
    <side-menu></side-menu>
      <div class="content">
      <router-outlet></router-outlet>
      </div>
    </div>
  </body>
  `,
  styleUrls: ['./layout.component.scss'],
  imports: [CommonModule, RouterOutlet, HeaderComponent, SideMenuComponent],
})
export class LayoutComponent {}
