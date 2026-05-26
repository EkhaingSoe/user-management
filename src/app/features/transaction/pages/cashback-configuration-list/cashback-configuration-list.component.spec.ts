import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashbackConfigurationListComponent } from './cashback-configuration-list.component';

describe('CashbackConfigurationListComponent', () => {
  let component: CashbackConfigurationListComponent;
  let fixture: ComponentFixture<CashbackConfigurationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashbackConfigurationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashbackConfigurationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
