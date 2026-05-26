import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashbackToMainBalanceComponent } from './cashback-to-main-balance.component';

describe('CashbackToMainBalanceComponent', () => {
  let component: CashbackToMainBalanceComponent;
  let fixture: ComponentFixture<CashbackToMainBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashbackToMainBalanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashbackToMainBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
