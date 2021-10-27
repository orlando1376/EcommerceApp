// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'default',
  firebase: {
        config : {
          apiKey: "AIzaSyCRqc-I_yqBGuz_yITzmlhl-lfLVQEYxkw",
          authDomain: "ecommerce2-5aa77.firebaseapp.com",
          projectId: "ecommerce2-5aa77",
          storageBucket: "ecommerce2-5aa77.appspot.com",
          messagingSenderId: "141005867593",
          appId: "1:141005867593:web:003fe404d512e21ea84d98"
        }
  },
  actionCodeSettings: {
    url: 'http://localhost:5200/profile/new',
    handleCodeInApp: true
  },
  url: 'http://localhost:1320'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
