import { Component, Inject, OnChanges, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-deal-dialog',
  standalone: true,
  imports: [
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
    MatSelectModule
  ],
  templateUrl: './deal-dialog.component.html',
  styleUrl: './deal-dialog.component.scss'
})
export class DealDialogComponent implements OnInit {
  dealTypes: string[] = ['Acquisition', 'Lease', 'Development'];
  dealForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DealDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Deal
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.updateCapRate();
  }

  createForm(): void {
    this.dealForm = this.fb.group({
      id: [this.data.id],
      name: [this.data.name, Validators.required],
      type: [this.data.type, Validators.required],
      purchasePrice: [this.data.purchasePrice, Validators.required],
      address: [this.data.address, Validators.required],
      noi: [this.data.noi, Validators.required],
      capRate: [this.data.capRate, Validators.required],
      image: [this.data.image, Validators.required]
    });
  }

  updateCapRate(): void {
    let noi = 0;
    let purchasePrice = 0;

    this.dealForm.get('noi')?.valueChanges.subscribe((noiValue: number) => {
      noi = noiValue;
      const result = this.calculateCapRate(noi, purchasePrice);
      this.dealForm.patchValue({ capRate: result });
    });

    this.dealForm.get('purchasePrice')?.valueChanges.subscribe((purchasePriceValue: number) => {
      purchasePrice = purchasePriceValue;
      const result = this.calculateCapRate(noi, purchasePrice);
      this.dealForm.patchValue({ capRate: result });
    });
  }

  calculateCapRate(noi: number, purchasePrice: number): string {
    let result = '0.00';

    if(noi > 0 && purchasePrice > 0) {
      result = (Math.round(noi / purchasePrice).toFixed(2));
    }

    return result;
  }

  dealSubmit(): void {
    this.dialogRef.close({
      ...this.dealForm.value, 
      capRate: Number(this.dealForm.value.capRate)/100
    });
  }

  cancel(): void {
    this.dealForm.reset();
    this.dialogRef.close();
  }
}
