import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'agenda-movies.firebaseapp.com',
  databaseURL: 'https://agenda-movies.firebaseio.com',
  projectId: 'agenda-movies',
  storageBucket: 'agenda-movies.appspot.com',
  messagingSenderId: '991810235878',
};

firebase.initializeApp(config);
export default firebase;
