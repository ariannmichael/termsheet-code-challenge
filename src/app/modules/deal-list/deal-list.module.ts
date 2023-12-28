import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealListComponent } from './deal-list.component';
import { DealListRoutingModule } from './deal-list-routing.component';
import { FilterOptionsComponent } from './filter-options/filter-options.component';
import { DealCardListModule } from './deal-card-list/deal-card-list.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
 declarations: [
  DealListComponent,
  FilterOptionsComponent
 ],
 imports: [
  CommonModule,
  DealListRoutingModule,
  DealCardListModule,
  MatToolbarModule,
  MatFormFieldModule, 
  MatInputModule, 
  MatIconModule,
  FormsModule,
  MatButtonModule
 ],
 providers: [
 ],
 exports: [
  DealListComponent
 ],
})
export class DealListModule { }