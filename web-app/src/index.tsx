import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import App from './App';

import './reset.css';
import './index.css';

axios.defaults.baseURL = process.env.BASE_API_URL;

ReactDOM.render(<App />, document.getElementById('app'));
