import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealDetailComponent } from './deal-detail.component';
import { DealDetailRoutingModule } from './deal-detail-routing.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@NgModule({
 declarations: [
  DealDetailComponent
 ],
 imports: [
  CommonModule,
  DealDetailRoutingModule,
  MatToolbarModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatCardModule
 ],
 providers: [
 ],
 exports: [
  DealDetailComponent
 ],
})
export class DealDetailModule { }