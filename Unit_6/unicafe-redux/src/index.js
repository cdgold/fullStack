import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'

import counterReducer from "./reducer"

const store = createStore(counterReducer)

const App = () => {
    return (
        <div>
            <div>
                <button 
                  onClick = {() => store.dispatch({ type: "GOOD" })}
                > 
                good 
                </button>
                <button 
                  onClick = {() => store.dispatch({ type: "OK" })}
                > 
                OK 
                </button>
                <button 
                  onClick = {() => store.dispatch({ type: "BAD" })}
                > 
                bad
                </button>
            </div>
            <div>
                <br></br>
                good: {store.getState().good} <br></br>
                OK: {store.getState().ok} <br></br>
                bad: {store.getState().bad} <br></br>
            </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))

const renderApp = () => {
    root.render(<App />)
}

renderApp()
store.subscribe(renderApp)