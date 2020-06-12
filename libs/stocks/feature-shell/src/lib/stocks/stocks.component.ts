import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { STOCKS_CONSTANTS } from './stocks.constants';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  readonly CONSTANTS = STOCKS_CONSTANTS;

  private componentDestroyed$ = new Subject();

  public stockPickerForm: FormGroup;
  public quotes$ = this.priceQuery.priceQueries$;
  public loading$ = this.priceQuery.priceQueryLoading$;
  public error$ = this.priceQuery.priceQueryError$;

  get symbolInput() {
    return this.stockPickerForm.get('symbol');
  }
  get periodInput() {
    return this.stockPickerForm.get('period');
  }

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.stockPickerForm.valueChanges
      .pipe(
        debounceTime(this.CONSTANTS.DEBOUNCE_TIME),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(() => {
        this.fetchQuote();
      });
  }

  public fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
    }
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
