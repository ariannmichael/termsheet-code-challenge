import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import DealFilter from '../../../shared/models/deal-filter';

@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrl: './filter-options.component.scss'
})
export class FilterOptionsComponent implements OnInit{
  @Output() 
  filterOptionsEvent = new EventEmitter<DealFilter>();
  dealTypes: string[] = ['All', 'Acquisition', 'Lease', 'Development'];
  filterForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.filterForm = this.fb.group({
      type: ['All'],
      purchasePrice: 0
    });
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  onFilter() {
    console.log(this.filterForm.value);
    
    const filter = new DealFilter(
      this.filterForm.value.type,
      this.filterForm.value.purchasePrice
    );

    this.filterOptionsEvent.emit(filter);
  }
}
