import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MyContainer from './container'; 

ReactDOM.render(<MyContainer />, document.getElementById('root'));
registerServiceWorker();
