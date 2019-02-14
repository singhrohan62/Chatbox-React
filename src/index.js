import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store/index';
import registerServiceWorker from './registerServiceWorker';
import { addUser } from './actions/index';

window.store = store;
window.addUser = addUser;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
