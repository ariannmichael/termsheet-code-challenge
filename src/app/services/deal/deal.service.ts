import { Injectable } from '@angular/core';
import { Deal } from '../../shared/models/deal.model';
import DealFilter from '../../shared/models/deal-filter';


@Injectable({
 providedIn: 'root'
})
export class DealService {

 public deals: Deal[] = [
  {
    id: 1,
    name: 'Deal 1',
    type: 'Development',
    address: '2972 Westheimer Rd. Santa Ana',
    noi: 44709,
    purchasePrice: 361994,
    capRate: 0.12,
    image: 'assets/images/elgin-01.jpeg'
  },
  {
    id: 2,
    name: 'Deal 2',
    type: 'Acquisition',
    address: '6391 Elgin St. Celina',
    noi: 911725,
    purchasePrice: 126483,
    capRate: 0.06,
    image: 'assets/images/warehousing-01.jpg'
  },
  {
    id: 3,
    name: 'Deal 3',
    type: 'Development',
    address: '2972 Westheimer Rd. Santa Ana',
    noi: 44709,
    purchasePrice: 361994,
    capRate: 0.12,
    image: 'assets/images/elgin-01.jpeg'
  },
  {
    id: 4,
    name: 'Deal 4',
    type: 'Acquisition',
    address: '6391 Elgin St. Celina',
    noi: 911725,
    purchasePrice: 126483,
    capRate: 0.06,
    image: 'assets/images/warehousing-01.jpg'
  },
  {
    id: 5,
    name: 'Deal 5',
    type: 'Development',
    address: '2972 Westheimer Rd. Santa Ana',
    noi: 44709,
    purchasePrice: 361994,
    capRate: 0.12,
    image: 'assets/images/elgin-01.jpeg'
  },
  {
    id: 6,
    name: 'Deal 6',
    type: 'Acquisition',
    address: '6391 Elgin St. Celina',
    noi: 911725,
    purchasePrice: 126483,
    capRate: 0.06,
    image: 'assets/images/warehousing-01.jpg'
  },
  {
    id: 7,
    name: 'Deal 7',
    type: 'Development',
    address: '2972 Westheimer Rd. Santa Ana',
    noi: 44709,
    purchasePrice: 361994,
    capRate: 0.12,
    image: 'assets/images/elgin-01.jpeg'
  },
  {
    id: 8,
    name: 'Deal 8',
    type: 'Acquisition',
    address: '6391 Elgin St. Celina',
    noi: 911725,
    purchasePrice: 126483,
    capRate: 0.06,
    image: 'assets/images/warehousing-01.jpg'
  }
];

 constructor() { }

 public getDeals(): Deal[] {
  return this.deals;
 }

 public addDeal(deal: Deal): Deal[] {
  this.deals.push(deal);
  return this.deals;
 }

 public searchDealsByName(dealName: string): Deal[] {
  return this.deals.filter(deal => deal.name.toLowerCase().includes(dealName.toLowerCase()));
 }

 public filterDeals(filter: DealFilter): Deal[] {
  let deals = this.filterByType(this.deals, filter.type);
  deals = this.filterByPurchasePrice(deals, filter.purchasePrice);
  return deals;
 }

 private filterByType(deals: Deal[], type: string): Deal[] {
  if(type === 'All') {
    return deals;
  }

  return deals.filter(deal => deal.type === type);
 }

 private filterByPurchasePrice(deals: Deal[], purchasePrice: number): Deal[] {
  if(purchasePrice === 0) {
    return deals;
  }

  return deals.filter(deal => deal.purchasePrice <= purchasePrice);
 }
}