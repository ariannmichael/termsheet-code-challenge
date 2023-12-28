import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealListComponent } from './deal-list.component';
import { DealListRoutingModule } from './deal-list-routing.component';
import { FilterOptionsComponent } from './filter-options/filter-options.component';
import { DealCardListModule } from './deal-card-list/deal-card-list.module';

@NgModule({
 declarations: [
  DealListComponent,
  FilterOptionsComponent
 ],
 imports: [
  CommonModule,
  DealListRoutingModule,
  DealCardListModule
 ],
 providers: [
 ],
 exports: [
  DealListComponent
 ],
})
export class DealListModule { }