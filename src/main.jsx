import 'antd-mobile/dist/antd-mobile.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-keep-alive"
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './common/reset.css'
import './components/dypage/common.scss'
import './index.css'
import './utils/rem'

ReactDOM.render(
  <Router>
    <Provider> 
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
)
