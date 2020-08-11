import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import './reset.css';
import './index.css';

axios.defaults.baseURL = process.env.BASE_API_URL;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app'),
);
