import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from "react-redux"
import combinedStore from "./store"
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <Provider store={combinedStore}>
        <App />
      </Provider>
    </Router>
)