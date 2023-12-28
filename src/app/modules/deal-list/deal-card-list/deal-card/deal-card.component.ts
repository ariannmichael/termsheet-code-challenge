import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Deal } from '../../../../shared/models/deal.model';

@Component({
  selector: 'app-deal-card',
  templateUrl: './deal-card.component.html',
  styleUrl: './deal-card.component.scss'
})
export class DealCardComponent implements OnInit {
  @HostBinding('style.--color') color: string = '#ffffff';
  
  @Input()
  deal!: Deal;

  ngOnInit(): void {
    this.updateBackgroundColor();
  }

  updateBackgroundColor(): void {
    if(this.deal.type === 'Development') {
      this.color = '#178F82';
    } else if(this.deal.type === 'Acquisition') {
      this.color = '#8764D8';
    } else {
      this.color = '#F94B76';
    }
  }
}
