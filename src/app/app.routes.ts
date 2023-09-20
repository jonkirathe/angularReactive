import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: '', loadComponent: () => import('./components/signals/signals.component').then((m) => m.SignalsComponent)},
    {path: 'rxjs', loadChildren: () => import('./components/app.routes').then(mod => mod.routes)},
    {path: '**', redirectTo: 'page/error'}
];
