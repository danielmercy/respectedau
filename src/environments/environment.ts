// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // Initialize Firebase
  firestoreConfig:  {
    apiKey: "AIzaSyBNuIXMmA4zXdYjgjQKtTrpfgiZxA4t2fU",
    authDomain: "respectedau.firebaseapp.com",
    databaseURL: "https://respectedau.firebaseio.com",
    projectId: "respectedau",
    storageBucket: "respectedau.appspot.com",
    messagingSenderId: "176962524559"
  },

  stripeKey: 'pk_test_AbRJSCdzQxE7jFsyMpjm7KSz' 
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
