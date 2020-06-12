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
  MatProgressBarModule,
  MatDatepickerModule,
  MatNativeDateModule
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
        MatDatepickerModule,
        MatNativeDateModule,
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
        startDate: '2020-05-03',
        endDate: '2020-05-15'
      });
      component.symbolInput.markAsTouched();
      expect(component.symbolInput.errors.required).toBeTruthy();
    });

    describe('compareDates()', () => {
      it('should set the date values to be the same when To is earlier than From', () => {
        const start = new Date('2020-04-04');
        const end = new Date('2020-04-01');
        component.startDate.setValue(start);
        component.endDate.setValue(end);
        component.compareDates(start, end);
        expect(component.endDate.value).toEqual(component.startDate.value);
      });
    });

    it('should fetch stock details', () => {
      component.stockPickerForm.setValue({
        symbol: 'AAL',
        startDate: '2020-05-03',
        endDate: '2020-05-15'
      });
      component.fetchQuote(
        new Date(component.startDate.value),
        new Date(component.endDate.value)
      );
      expect(component.quotes$).toBeTruthy();
    });
  });
});
