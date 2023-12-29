import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Deal } from '../../../../shared/models/deal.model';
import { colorByDealType } from '../../../../shared/helpers';
@Component({
  selector: 'app-deal-card',
  templateUrl: './deal-card.component.html',
  styleUrl: './deal-card.component.scss'
})
export class DealCardComponent implements OnInit {
  @HostBinding('style.--color') color: string = '#ffffff';
  
  @Input()
  deal!: Deal;

  @Output()
  editDealEvent = new EventEmitter<Deal>();

  ngOnInit(): void {
    this.updateBackgroundColor();
  }

  updateBackgroundColor(): void {
    this.color = colorByDealType(this.deal);
  }

  onEdit(): void {
    this.editDealEvent.emit(this.deal);
  }
}
