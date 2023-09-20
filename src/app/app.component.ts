import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from "./shared/layout/layout.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <app-layout></app-layout>
  `,
    imports: [CommonModule, LayoutComponent]
})
export class AppComponent {
  title = 'angularReactive';
}
