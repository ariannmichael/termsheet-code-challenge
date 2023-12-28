import { Routes } from '@angular/router';

export const routes: Routes = [
 {
  path: 'deals',
  loadChildren: () => import('./modules/deal-list/deal-list.module')
   .then(mod => mod.DealListModule)
 },
 {
  path: 'deal/:id',
  loadChildren: () => import('./modules/deal-detail/deal-detail.module')
   .then(mod => mod.DealDetailModule)
 },
 {path: '', redirectTo: 'deals', pathMatch: 'full'}
];
