import * as $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom/client'
// import json from '@assets/json'
// import xml from '@assets/data.xml'
// import csv from '@assets/data.csv'
import logo from '@assets/logo.png'

import Post from '@models/Post'
import './babel'

import './styles/styles.css'
import './styles/style.scss'

const App = () => (
  <div className='container'>
    <h1>webpack</h1>
    <hr />
    <div className='logo'></div>
    <hr />
    <pre />
    <hr />
    <div className='box'>
      <h2>Hello scss!</h2>
    </div>
  </div>
)
const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// console.log('JSON', json)
// console.log('XML', xml)
// console.log('CSV', csv)

const post = new Post('This is title of Webpack', logo)

$('pre').addClass('code').html(post.toString()) // jquery syntax

// console.log('toString() methods log:', post.toString())
