import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealDialogComponent } from './deal-dialog.component';

describe('DealDialogComponent', () => {
  let component: DealDialogComponent;
  let fixture: ComponentFixture<DealDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DealDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
