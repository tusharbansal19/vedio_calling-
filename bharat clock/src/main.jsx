import "bootstrap/dist/css/bootstrap.min.css"
import React from 'react'
import ReactDOM from 'react-dom/client'
import Calculator from "./cALCULATOR.JSX"
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App1 /> */}
    <Calculator></Calculator>
  </React.StrictMode>,
)
