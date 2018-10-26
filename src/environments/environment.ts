// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// export const environment = {
//   production: false
// };
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAnjr5ixQQhhYVo3g4dhCmDrIvhDw',      
    authDomain: 'neo-registration.firebaseapp.com',      
    databaseURL: 'https://neo-registration.firebaseio.com',      
    projectId: 'neo-registration',      
    storageBucket: 'neo-registration.appspot.com',      
    messagingSenderId: '210511991930'   
  }
};