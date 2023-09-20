import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-observables',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card m-2 p-2">
            <div class="card-header">Observable</div>
            <div class="card-body">
              <h5 class="card-title">
                What is observable in Angular and when to use? Observable in
                Angular is a feature that provides support for delivering
                messages between different parts of your single-page application
                <h6 class="text-primary">Data from diffrent subscribers always be different(unicast)</h6>
              </h5>
              <div class="card-body">
                <div class="row">
                  <div class="row pb-2">
                    <div class="col-md-6">
                      <button
                        type="button"
                        class="btn btn-primary"
                        (click)="getObservableContent()"
                      >
                        Click To Subscribe To 2 Subscribers
                      </button>
                    </div>
                    <div class="col-md-6">
                    <div class="row">
                    <div class="col-md-3">
                      <label>Data: {{observableData}}</label>
                    </div>
                    <div class="col-md-3">
                      <label>Data: {{observableData2}}</label>
                    </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <a
                  href="https://github.com/Jonnykratz/angularReactive"
                  class="btn btn-primary"
                  >Github</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./observables.component.scss'],
})
export class ObservablesComponent {
  observableData: any;
  observableData2: any;
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
  }

  getObservableContent() {
    let observable$ = new Observable<any>((observer) => {
      observer.next(Math.floor(Math.random() * 99) + 1);
    });
    observable$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.observableData = data;
    });
    observable$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.observableData2 = data;
    });
  }
}
