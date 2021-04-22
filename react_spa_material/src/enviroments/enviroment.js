import * as firebase from 'firebase/app';
import 'firebase/auth';

var baseUrl = process.env.REACT_APP_NOT_SECRET_CODE ? process.env.REACT_APP_NOT_SECRET_CODE : 'http://localhost:3000/'

export const environment = {
    production: false,
    apiUrl: baseUrl,
    fetch: (url, settings) => {
      
        return firebase.auth().currentUser.getIdToken(false)
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
        }).catch()
  },
  jobsEnabled: () => {
    return process.env.REACT_APP_JOBS_ENABLED ?  true: false
  },
  isVa: () => (
    location.origin.includes("va.") || (process.env.REACT_APP_VA_ENABLED ?  true: false)
  ),
  isPP: () => (
    location.origin.includes("ppmechanical.") || (process.env.REACT_APP_PP_ENABLED ?  true: false)
  )
  };
