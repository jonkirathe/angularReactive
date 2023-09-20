import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplaySubject } from 'rxjs';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-replay-subject',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card m-2 p-2">
            <div class="card-header">ReplaySubject</div>
            <div class="card-body">
              <h5 class="card-title">
              A ReplaySubject is like an observable but can be multicast to many Observers
              <h6 class="text-primary">It returns all the previous Data</h6>
              </h5>
              <div class="card-body">
                <div class="row">
                  <div class="row pb-2">
                    <div class="col-md-6">
                      <button
                        type="button"
                        class="btn btn-primary"
                        (click)="emitItem()"
                      >
                        Emit Item
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        (click)="getItems()"
                      >
                      Get Item
                      </button>
                    </div>
                    <div class="col-md-6">
                    <div class="col-md-3">
                      <label *ngFor="let item of items">{{item}}</label>
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
  `,
  styleUrls: ['./replay-subject.component.scss']
})
export class ReplaySubjectComponent {
  items = [] as any[];
  replaySubject = new ReplaySubject(0);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
 
   emitItem(){
     this.replaySubject.next(1);
     console.log('====================================');
     console.log(1);
     console.log('====================================');
     setTimeout(() => {
       this.replaySubject.next(2);
     }, 2000);
     setTimeout(() => {
       this.replaySubject.next(3);
     }, 4000);
     setTimeout(() => {
       this.replaySubject.next(4);
     }, 6000);
   }
 
   getItems(){
     this.replaySubject.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data: any) => {
       this.items.push(data);
     })
   }
}
