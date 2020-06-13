import { PriceQueryAction, PriceQueryActionTypes } from './price-query.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PriceQuery } from './price-query.type';
import { transformPriceQueryResponse } from './price-query-transformer.util';

export const PRICEQUERY_FEATURE_KEY = 'priceQuery';

export interface PriceQueryState extends EntityState<PriceQuery> {
  selectedSymbol: string;
  loading: boolean;
  error: any;
}

export function sortByDateNumeric(a: PriceQuery, b: PriceQuery): number {
  return a.dateNumeric - b.dateNumeric;
}

export const priceQueryAdapter: EntityAdapter<PriceQuery> = createEntityAdapter<
  PriceQuery
>({
  selectId: (priceQuery: PriceQuery) => priceQuery.dateNumeric,
  sortComparer: sortByDateNumeric
});

export interface PriceQueryPartialState {
  readonly [PRICEQUERY_FEATURE_KEY]: PriceQueryState;
}

export const initialState: PriceQueryState = priceQueryAdapter.getInitialState({
  selectedSymbol: '',
  loading: false,
  error: null
});

export function priceQueryReducer(
  state: PriceQueryState = initialState,
  action: PriceQueryAction
): PriceQueryState {
  switch (action.type) {
    case PriceQueryActionTypes.FetchPriceQuery: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case PriceQueryActionTypes.PriceQueryFetched: {
      return priceQueryAdapter.addAll(
        transformPriceQueryResponse(
          action.queryResults,
          action.startDate,
          action.endDate
        ),
        { ...state, loading: false, error: null }
      );
    }
    case PriceQueryActionTypes.SelectSymbol: {
      return {
        ...state,
        selectedSymbol: action.symbol
      };
    }
    case PriceQueryActionTypes.PriceQueryFetchError: {
      return {
        ...state,
        ids: [],
        loading: false,
        error: action.error
      };
    }
    default:
      return state;
  }
}
