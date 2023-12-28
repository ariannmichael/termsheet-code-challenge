import { Component, OnInit } from '@angular/core';
import { Deal } from '../../shared/models/deal.model';
import { DealService } from '../../services/deal/deal.service';

@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.scss']
})
export class DealListComponent implements OnInit{

  deals: Deal[] = [];
  dealName: string = '';

  constructor(private dealService: DealService) { }

  ngOnInit(): void {
    this.deals = this.dealService.getDeals();
  }

  onSearch() {
    this.deals = this.dealService.searchDealsByName(this.dealName);
  }

  onAdd() {
    this.dealService.addDeal({
      id: 6,
      name: 'Deal 6',
      type: 'Development',
      address: '2972 Westheimer Rd. Santa Ana',
      noi: 44709,
      purchasePrice: 361994,
      capRate: 0.12,
      image: 'assets/images/elgin-01.jpeg'
    });
  }
}
