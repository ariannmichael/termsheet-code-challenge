import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Deal } from '../../../shared/models/deal.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-deal-card-list',
  templateUrl: './deal-card-list.component.html',
  styleUrl: './deal-card-list.component.scss'
})
export class DealCardListComponent implements OnInit, OnChanges {
  @Input()
  deals: Deal[] = [];

  @Output()
  editDealEvent = new EventEmitter<Deal>();

  @ViewChild('paginator', { static: true }) 
  paginator!: MatPaginator;

  pageLength = 0;
  pageSize = 6;
  pageSizeOptions: number[] = [6, 12, 24, 100];
  splicedData: Deal[] = [];  

  ngOnInit(): void {
    this.splicedData = this.deals.slice(0, this.pageSize);
    this.pageLength = this.deals.length;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['deals']) {
      this.splicedData = this.deals.slice(0, this.pageSize);
      this.pageLength = this.deals.length;
    }
  }

  onEditDeal(deal: Deal): void {
    this.editDealEvent.emit(deal);
  }

  pageChangeEvent(event: PageEvent) {
    this.pageSize = event.pageSize;

    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.splicedData = this.deals.slice(offset).slice(0, event.pageSize);
  }
}
