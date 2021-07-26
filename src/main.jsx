import "antd-mobile/dist/antd-mobile.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-keep-alive";
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './common/css/reset.css';
import './components/dypage/common.scss';
import './public/index.css';
import './utils/rem';
ReactDOM.render(
  <Router>
    <Provider>
      <App  />
    </Provider>
  </Router>,
  document.getElementById("root")
);
