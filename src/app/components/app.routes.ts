import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: "subject", loadComponent: () => import("./subject/subject.component").then((m) => m.SubjectComponent)},
  {path: "observable", loadComponent: () => import("./observables/observables.component").then((m) => m.ObservablesComponent)},
  {path: "behaviour-subject", loadComponent: () => import("./behaviour-subject/behaviour-subject.component").then((m) => m.BehaviourSubjectComponent)},
  {path: "replay-subject", loadComponent: () => import("./replay-subject/replay-subject.component").then((m) => m.ReplaySubjectComponent)},
  {path: "operators", loadComponent: () => import("./operators/operators.component").then((m) => m.OperatorsComponent)}
]
