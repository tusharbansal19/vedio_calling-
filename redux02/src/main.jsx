import "bootstrap/dist/css/bootstrap.min.css"
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import App from './App.jsx'
import UseStore from "./Store/index.js"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

 <Provider store={UseStore}>

    <App />
 </Provider>
)
