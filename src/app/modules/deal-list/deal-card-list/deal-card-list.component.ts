import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Deal } from '../../../shared/models/deal.model';

@Component({
  selector: 'app-deal-card-list',
  templateUrl: './deal-card-list.component.html',
  styleUrl: './deal-card-list.component.scss'
})
export class DealCardListComponent {
  @Input()
  deals: Deal[] = [];

  @Output()
  editDealEvent = new EventEmitter<Deal>();

  onEditDeal(deal: Deal): void {
    this.editDealEvent.emit(deal);
  }
}
