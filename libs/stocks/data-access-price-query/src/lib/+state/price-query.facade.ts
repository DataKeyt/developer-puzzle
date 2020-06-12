import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, skip } from 'rxjs/operators';
import { FetchPriceQuery } from './price-query.actions';
import { PriceQueryPartialState } from './price-query.reducer';
import {
  getSelectedSymbol,
  getAllPriceQueries,
  getLoadingStatus,
  getErrorMessage
} from './price-query.selectors';

@Injectable()
export class PriceQueryFacade {
  public selectedSymbol$ = this.store.pipe(select(getSelectedSymbol));
  public priceQueryLoading$ = this.store.pipe(select(getLoadingStatus));
  public priceQueryError$ = this.store.pipe(select(getErrorMessage));
  public priceQueries$ = this.store.pipe(
    select(getAllPriceQueries),
    skip(1),
    map(priceQueries =>
      priceQueries.map(priceQuery => [priceQuery.date, priceQuery.close])
    )
  );

  constructor(private store: Store<PriceQueryPartialState>) {}

  public fetchQuote(
    symbol: string,
    period: string,
    startDate: Date,
    endDate: Date
  ) {
    this.store.dispatch(
      new FetchPriceQuery(symbol, period, startDate, endDate)
    );
  }
}
