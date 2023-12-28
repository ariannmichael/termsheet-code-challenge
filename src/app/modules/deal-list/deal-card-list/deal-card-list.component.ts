import { Component } from '@angular/core';
import { Deal } from '../../../shared/models/deal.model';

@Component({
  selector: 'app-deal-card-list',
  templateUrl: './deal-card-list.component.html',
  styleUrl: './deal-card-list.component.scss'
})
export class DealCardListComponent {
  public deals: Deal[] = [
    {
      name: 'Deal 1',
      type: 'Development',
      address: '2972 Westheimer Rd. Santa Ana',
      noi: 44709,
      purchasePrice: 361994,
      capRate: 0.12,
      image: 'assets/images/elgin-01.jpeg'
    },
    {
      name: 'Deal 2',
      type: 'Acquisition',
      address: '6391 Elgin St. Celina',
      noi: 911725,
      purchasePrice: 126483,
      capRate: 0.06,
      image: 'assets/images/warehousing-01.jpg'
    },
    {
      name: 'Deal 3',
      type: 'Development',
      address: '2972 Westheimer Rd. Santa Ana',
      noi: 44709,
      purchasePrice: 361994,
      capRate: 0.12,
      image: 'assets/images/elgin-01.jpeg'
    },
    {
      name: 'Deal 4',
      type: 'Acquisition',
      address: '6391 Elgin St. Celina',
      noi: 911725,
      purchasePrice: 126483,
      capRate: 0.06,
      image: 'assets/images/warehousing-01.jpg'
    },
    {
      name: 'Deal 3',
      type: 'Development',
      address: '2972 Westheimer Rd. Santa Ana',
      noi: 44709,
      purchasePrice: 361994,
      capRate: 0.12,
      image: 'assets/images/elgin-01.jpeg'
    },
    {
      name: 'Deal 4',
      type: 'Acquisition',
      address: '6391 Elgin St. Celina',
      noi: 911725,
      purchasePrice: 126483,
      capRate: 0.06,
      image: 'assets/images/warehousing-01.jpg'
    },
    {
      name: 'Deal 3',
      type: 'Development',
      address: '2972 Westheimer Rd. Santa Ana',
      noi: 44709,
      purchasePrice: 361994,
      capRate: 0.12,
      image: 'assets/images/elgin-01.jpeg'
    },
    {
      name: 'Deal 4',
      type: 'Acquisition',
      address: '6391 Elgin St. Celina',
      noi: 911725,
      purchasePrice: 126483,
      capRate: 0.06,
      image: 'assets/images/warehousing-01.jpg'
    }
  ];
}
