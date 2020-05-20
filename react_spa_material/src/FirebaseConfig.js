import * as firebase from 'firebase/app';
import 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyBbMPebF4rPXd17m_iG7otIxm1RH5SKQwI",
    authDomain: "app.yourjha.com",
    databaseURL: "https://sound-helper-249805.firebaseio.com",
    projectId: "sound-helper-249805",
    storageBucket: "sound-helper-249805.appspot.com",
    messagingSenderId: "592539609605",
    appId: "1:592539609605:web:5c0600a69d311e45254a6c",
    measurementId: "G-3R54YECYWR"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;