import { Routes } from '@angular/router';

export const routes: Routes = [
 {
  path: 'deals',
  loadChildren: () => import('./modules/deal-list/deal-list.module')
   .then(mod => mod.DealListModule)
 },
 {path: '', redirectTo: 'deals', pathMatch: 'full'}
];
