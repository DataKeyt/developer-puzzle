export const STOCKS_CONSTANTS = {
  SYMBOL_PLACEHOLDER: 'Symbol e.g AAPL',
  TIME_PERIOD_LABEL: 'Favorite time period',
  DEBOUNCE_TIME: 500,
  SYMBOL_MISSING_ERROR: 'Please enter a symbol',
  PERIOD_SELECTION_ERROR: 'Please select a period',
  ERROR_OCCURRED: 'An error has occurred:',
  TIME_PERIODS: [
    { viewValue: 'All available data', value: 'max' },
    { viewValue: 'Five years', value: '5y' },
    { viewValue: 'Two years', value: '2y' },
    { viewValue: 'One year', value: '1y' },
    { viewValue: 'Year-to-date', value: 'ytd' },
    { viewValue: 'Six months', value: '6m' },
    { viewValue: 'Three months', value: '3m' },
    { viewValue: 'One month', value: '1m' }
  ]
};
