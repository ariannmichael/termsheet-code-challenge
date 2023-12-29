import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Deal } from '../../models/deal.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-deal-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatGridListModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './deal-dialog.component.html',
  styleUrl: './deal-dialog.component.scss'
})
export class DealDialogComponent implements OnInit {
  dealTypes: string[] = ['Acquisition', 'Lease', 'Development'];
  dealForms!: FormGroup[];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DealDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Deal
  ) {}
  
  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    const dealForm = this.fb.group({
      id: [this.data.id],
      name: [this.data.name, Validators.required],
      type: [this.data.type, Validators.required],
      purchasePrice: [this.data.purchasePrice, Validators.required],
      address: [this.data.address, Validators.required],
      noi: [this.data.noi, Validators.required],
      capRate: [this.data.capRate, Validators.required],
      image: [this.data.image, Validators.required]
    });

    this.dealForms = [dealForm];
  }

  updateCapRate(dealForm: any): void {
    let noi = 0;
    let purchasePrice = 0;

    dealForm.get('noi')?.valueChanges.subscribe((noiValue: number) => {
      noi = noiValue;
      const result = this.calculateCapRate(noi, purchasePrice);
      dealForm.patchValue({ capRate: result });
    });

    dealForm.get('purchasePrice')?.valueChanges.subscribe((purchasePriceValue: number) => {
      purchasePrice = purchasePriceValue;
      const result = this.calculateCapRate(noi, purchasePrice);
      dealForm.patchValue({ capRate: result });
    });
  }

  calculateCapRate(noi: number, purchasePrice: number): string {
    let result = '0.00';

    if(noi > 0 && purchasePrice > 0) {
      result = (Math.round(noi / purchasePrice).toFixed(2));
    }

    return result;
  }

  addForm(): void {
    const newForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      type: ['', Validators.required],
      purchasePrice: ['', Validators.required],
      address: ['', Validators.required],
      noi: ['', Validators.required],
      capRate: ['', Validators.required],
      image: ['', Validators.required]
    });
    this.dealForms.push(newForm);

    this.updateCapRate(newForm);
  }

  dealSubmit(): void {
    this.dealForms.map(form => form.markAllAsTouched());
    this.dialogRef.close(this.dealForms.map(form => form.value));
  }

  cancel(): void {
    this.dealForms.map(form => form.reset());
    this.dealForms = [];
    this.dialogRef.close();
  }
}
