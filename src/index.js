import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import serviceWorker from './serviceWorker';
import firebase from './firebaseStarter';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker();
firebase();
