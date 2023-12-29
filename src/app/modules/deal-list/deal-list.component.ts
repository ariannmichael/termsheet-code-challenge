import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Deal } from '../../shared/models/deal.model';
import { DealService } from '../../services/deal/deal.service';
import DealFilter from '../../shared/models/deal-filter';
import { MatDialog } from '@angular/material/dialog';
import { DealDialogComponent } from '../../shared/components/deal-dialog/deal-dialog.component';

@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.scss']
})
export class DealListComponent implements OnInit {
  deals: Deal[] = [];
  dealName: string = '';

  constructor(
    private dealService: DealService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.deals = this.dealService.getDeals();
  }

  onSearch(): void {
    this.deals = this.dealService.searchDealsByName(this.dealName);
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(DealDialogComponent, {
      data: {
        name: '', 
        type: '', 
        purchasePrice: 0, 
        address: '', 
        noi: 0, 
        capRate: 0, 
        image: ''
      },
    });

    dialogRef.afterClosed().subscribe((result: Deal[]) => {
      if(!result) return;
      
      result.map((deal: Deal) => {
        this.dealService.addDeal(deal);
      });

      const newDeals = this.dealService.getDeals();      
      this.deals = [...newDeals];      
    });
  }

  onEdit(deal: Deal): void {
    const dialogRef = this.dialog.open(DealDialogComponent, {
      data: {...deal, capRate: deal.capRate * 100},
    });

    dialogRef.afterClosed().subscribe((result: Deal[]) => {
      if(!result) return;

      this.dealService.editDeal(result[0]);

      const newDeals = this.dealService.getDeals();     
      this.deals = [...newDeals];
    });
  }

  filterDealsByOptions(filter: DealFilter): void {
    this.deals = this.dealService.filterDeals(filter);
  }
}
