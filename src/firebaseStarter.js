import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB9y2eb0nIRbn82WQ4w6yhnCRlhh_g0P0s',
  authDomain: 'agenda-movies.firebaseapp.com',
  databaseURL: 'https://agenda-movies.firebaseio.com',
  projectId: 'agenda-movies',
  storageBucket: 'agenda-movies.appspot.com',
  messagingSenderId: '991810235878',
};

export default function init() {
  firebase.initializeApp(config);
}
