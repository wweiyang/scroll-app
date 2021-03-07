import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import App from './App'

ReactDOM.render(
    <div className="container">
        <h1 className="title">The Long Scroll</h1>
        <p className="subtitle">An app with no footer</p>
        <App /> 
    </div>,
    document.getElementById('root')
)
