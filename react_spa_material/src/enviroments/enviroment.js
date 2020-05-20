import * as firebase from 'firebase/app';
import 'firebase/auth';

var baseUrl = process.env.REACT_APP_NOT_SECRET_CODE ? process.env.REACT_APP_NOT_SECRET_CODE : 'http://localhost:3000/'

export const environment = {
    production: false,
    apiUrl: baseUrl,
    fetch: (url, settings) => {
      if (firebase.auth().currentUser) {
        return firebase.auth().currentUser.getIdToken(true)
        .then((idToken) => {
          return  fetch(baseUrl+url, {
            ...settings,
            'headers': 
              settings != undefined ? {
                ...settings.headers,
                "Authorization":"bearer "+idToken,
              } :
              {
                "Authorization":"bearer "+idToken,
              }
              
            
          })
        })
    }
  },
  };
