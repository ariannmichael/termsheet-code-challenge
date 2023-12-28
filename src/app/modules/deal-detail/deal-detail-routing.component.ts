import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealDetailComponent } from './deal-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DealDetailComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealDetailRoutingModule { }