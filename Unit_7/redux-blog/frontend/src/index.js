import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from "react-redux"
import combinedStore from "./store"
import { BrowserRouter as Router } from "react-router-dom"
import { createTheme, ThemeProvider, GlobalStyles, CssBaseline } from "@mui/material"
import { blue } from "@mui/material/colors"

const theme = createTheme ({
  palette: {
    primary: {
      main: blue[900]
    },
    secondary: {
      main: blue[100]
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <Provider store={combinedStore}>
        <ThemeProvider theme={theme}>
        <CssBaseline />
          <GlobalStyles styles={(theme) => ({ h2: {color:blue[700] } })} />
            <App />
        </ThemeProvider>
      </Provider>
    </Router>
)