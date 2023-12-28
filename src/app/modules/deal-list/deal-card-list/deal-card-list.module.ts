import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealCardListComponent } from './deal-card-list.component';
import { DealCardComponent } from './deal-card/deal-card.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
 declarations: [
  DealCardListComponent,
  DealCardComponent
 ],
 imports: [
  CommonModule,
  MatCardModule
 ],
 providers: [
 ],
 exports: [
  DealCardListComponent,
 ],
})
export class DealCardListModule { }