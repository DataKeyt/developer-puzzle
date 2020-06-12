import { PriceQueryResponse, PriceQuery } from './price-query.type';
import { map, pick } from 'lodash-es';
import { parse } from 'date-fns';

export function transformPriceQueryResponse(
  response: PriceQueryResponse[],
  startDate: Date,
  endDate: Date
): PriceQuery[] {
  response = response.filter(resp => {
    const stockDate = new Date(resp.date);
    // Set date to midnight to start from the day's beginning
    stockDate.setHours(0, 0, 0, 0);
    return stockDate >= startDate && stockDate <= endDate;
  });
  return map(
    response,
    responseItem =>
      ({
        ...pick(responseItem, [
          'date',
          'open',
          'high',
          'low',
          'close',
          'volume',
          'change',
          'changePercent',
          'label',
          'changeOverTime'
        ]),
        dateNumeric: parse(responseItem.date).getTime()
      } as PriceQuery)
  );
}
