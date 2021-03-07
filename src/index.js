import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import App from './App'
import Header from './header'

ReactDOM.render(
    <div className="container">
        <Header />
        <App /> 
    </div>,
    document.getElementById('root')
)
