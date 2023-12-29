import { Component, Inject, OnInit } from '@angular/core';
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
export class DealDialogComponent implements OnInit{
  dealTypes: string[] = ['Acquisition', 'Lease', 'Development'];
  dealForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DealDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Deal
  ) {}

  ngOnInit(): void {
    this.createForm();
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

  dealSubmit(): void {
    this.dialogRef.close({
      ...this.dealForm.value, 
      capRate: Number(this.dealForm.value.capRate)/100
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
