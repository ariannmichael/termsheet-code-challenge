import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Deal } from '../../shared/models/deal.model';
import { DealService } from '../../services/deal/deal.service';
import { colorByDealType } from '../../shared/helpers';

@Component({
  selector: 'app-deal-detail',
  templateUrl: './deal-detail.component.html',
  styleUrl: './deal-detail.component.scss'
})
export class DealDetailComponent implements OnInit {
  @HostBinding('style.--color') color: string = '#ffffff';

  deal!: Deal;

  constructor(
    private route: ActivatedRoute,
    private dealService: DealService
  ) { }

  ngOnInit(): void {
    this.getDealById();
    this.updateBackgroundColor();
  }

  updateBackgroundColor(): void {
    this.color = colorByDealType(this.deal);
  }

  getDealById() {
    let dealId = this.route.snapshot.paramMap.get('id')!;
    this.deal = this.dealService.getDealById(Number(dealId));
  }
}
