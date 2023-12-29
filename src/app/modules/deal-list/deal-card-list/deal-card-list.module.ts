import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DealCardListComponent } from './deal-card-list.component';
import { DealCardComponent } from './deal-card/deal-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
 declarations: [
  DealCardListComponent,
  DealCardComponent
 ],
 imports: [
  CommonModule,
  RouterModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatButtonModule,
  MatPaginatorModule
 ],
 providers: [
 ],
 exports: [
  DealCardListComponent,
 ],
})
export class DealCardListModule { }