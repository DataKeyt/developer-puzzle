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

  public maxDate = new Date();
  public stockPickerForm: FormGroup;
  public quotes$ = this.priceQuery.priceQueries$;
  public loading$ = this.priceQuery.priceQueryLoading$;
  public error$ = this.priceQuery.priceQueryError$;

  get symbolInput() {
    return this.stockPickerForm.get('symbol');
  }
  get startDate() {
    return this.stockPickerForm.get('startDate');
  }
  get endDate() {
    return this.stockPickerForm.get('endDate');
  }

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      startDate: [null],
      endDate: [null]
    });
  }

  ngOnInit() {
    // Subscribing only to symbol input because datepickers have their own triggers
    this.symbolInput.valueChanges
      .pipe(
        debounceTime(this.CONSTANTS.DEBOUNCE_TIME),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(() => {
        const startDate = this.startDate.value;
        const endDate = this.endDate.value;
        // Keeping this check here so it wouldn't automatically update the date values on 'symbol' input change
        if (startDate && endDate) {
          this.compareDates(startDate, endDate);
        }
      });
  }

  // Validating input value after blurring so the setValue wouldn't mess up manually typing the date in the input
  public validateDate(formControlName: string) {
    const dateInput = this.stockPickerForm.get(formControlName);
    if (dateInput.touched && !dateInput.value) {
      dateInput.setValue(new Date());
    }
  }

  public compareDates(start: Date, end: Date) {
    // If there is only end date, set both values to be the same to prevent end date being before start
    if (!start && end) {
      start = end;
      // Set value to the input so the user would also have the info about what just happened
      this.startDate.setValue(end);
    }
    if (!end) {
      end = new Date();
      this.endDate.setValue(end);
    }
    if (end < start) {
      this.endDate.patchValue(start);
    }

    this.fetchQuote(start, end);
  }

  public fetchQuote(startDate: Date, endDate: Date) {
    if (this.stockPickerForm.valid) {
      const symbol = this.symbolInput.value;
      const period = this.calculateDiff(startDate);
      this.priceQuery.fetchQuote(symbol, period, startDate, endDate);
    }
  }

  private calculateDiff(startDate: Date): string {
    /*
      Calculating difference in months. Using current date to get correct time period from startDate until today.
      Otherwise when the user picks for example Apr 28 - Apr 30, the query will be sent with period parameter '1m'
      which will return data from the previous month of the current day
    */
    const months = new Date().getFullYear() - startDate.getFullYear();

    // Calculate the difference in full months between startDate and endDate
    const timePeriod =
      months * 12 + (new Date().getMonth() - startDate.getMonth() + 1);

    // Calculating all the ranges that used to be in the dropdown except for 'ytd
    if (timePeriod <= 1) {
      return '1m';
    } else if (timePeriod > 1 && timePeriod <= 3) {
      return '3m';
    } else if (timePeriod > 3 && timePeriod <= 6) {
      return '6m';
    } else if (timePeriod > 6 && timePeriod <= 12) {
      return '1y';
    } else if (timePeriod > 12 && timePeriod <= 24) {
      return '2y';
    } else if (timePeriod > 24 && timePeriod <= 60) {
      return '5y';
    } else {
      return 'max';
    }
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
