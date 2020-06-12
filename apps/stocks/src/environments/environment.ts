import { StocksAppConfig } from '@coding-challenge/stocks/data-access-app-config';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: StocksAppConfig = {
  production: false,
  /*
  Normally, I would add the API key to a config.constants file and add that to the .gitignore
  because I am strongly against putting your API key out in the open.
  But for the purposes of this exercise, I will resist my instincts and just add it here.
  */
  apiKey: 'Tpk_c616780a1013445a8c3e65f21ec11053',
  apiURL: 'https://sandbox.iexapis.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';
