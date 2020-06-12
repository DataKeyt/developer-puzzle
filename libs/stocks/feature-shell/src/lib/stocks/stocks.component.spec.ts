import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatProgressBarModule
} from '@angular/material';

import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { StocksComponent } from './stocks.component';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  let priceQuery$: PriceQueryFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatProgressBarModule,
        SharedUiChartModule,
        StoreModule.forRoot({})
      ],
      providers: [PriceQueryFacade, FormBuilder],
      declarations: [StocksComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    (component as any).quotes$ = of([
      {
        date: '2020-05-19',
        uClose: 317.71,
        uOpen: 320.65,
        uHigh: 332.16,
        uLow: 314.67,
        uVolume: 25594414,
        close: 314.28,
        open: 330.61,
        high: 329.2,
        low: 319.59,
        volume: 26634094,
        currency: '',
        change: -1.87,
        changePercent: -0.5927,
        label: 'May 19, 20',
        changeOverTime: 1.437971
      }
    ]);
  });

  beforeEach(inject([PriceQueryFacade], (priceQuery: PriceQueryFacade) => {
    priceQuery$ = priceQuery;
    TestBed.get(PriceQueryFacade);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    component.ngOnInit();
    expect(component.ngOnInit).toBeTruthy();
  });

  describe('fetchQuoteEvent()', () => {
    it('should display error when symbol input is empty', () => {
      component.stockPickerForm.setValue({
        symbol: '',
        period: '1y'
      });
      component.symbolInput.markAsTouched();
      expect(component.symbolInput.errors.required).toBeTruthy();
    });

    it('should display error when period input is empty', () => {
      component.stockPickerForm.setValue({
        symbol: 'AAPL',
        period: ''
      });
      component.periodInput.markAsTouched();
      expect(component.periodInput.errors.required).toBeTruthy();
    });

    it('should fetch stock details', () => {
      component.stockPickerForm.setValue({
        symbol: 'AAPL',
        period: '1y'
      });
      component.fetchQuote();
      expect(component.quotes$).toBeTruthy();
    });
  });
});
