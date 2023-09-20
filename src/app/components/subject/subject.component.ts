import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card m-2 p-2">
            <div class="card-header">Subject</div>
            <div class="card-body">
              <h5 class="card-title">
              A Subject is like an observable but can be multicast to many Observers
              <h6 class="text-primary">Data from diffrent subscribers always be the same(multicast)</h6>
              </h5>
              <div class="card-body">
                <div class="row">
                  <div class="row pb-2">
                    <div class="col-md-6">
                      <button
                        type="button"
                        class="btn btn-primary"
                        (click)="getSubjectContent()"
                      >
                        Data From 2 Subscribers
                      </button>
                    </div>
                    <div class="col-md-6">
                    <div class="row">
                    <div class="col-md-3">
                      <label>Data: {{subjectData}}</label>
                    </div>
                    <div class="col-md-3">
                      <label>Data: {{subjectData2}}</label>
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
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent {
  subjectData: any;
  subjectData2: any;
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
  }

  getSubjectContent(){
    let subject$ = new Subject();
    subject$.next(0);//never returns already emmitted
    subject$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.subjectData = data;
    });
    subject$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.subjectData2 = data;
    });
    subject$.next(Math.floor(Math.random() * 99) + 1);
  }
}
