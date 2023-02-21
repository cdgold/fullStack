import React from 'react'
import ReactDOM from 'react-dom/client'
// import { createSt } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import combinedStore from "./store"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={combinedStore}>
    <App />
  </Provider>
)