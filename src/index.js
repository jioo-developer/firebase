import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"
import {Provider} from 'react-redux';
import {combineReducers, createStore} from "redux"

let defaults= [];

let displayNames = []

function reducer(state = defaults, action){
  if(action.type==="쿼리스트링보내기"){
    let location = [...defaults]
    location.push(action.payload)
    return location
  } else {
    return state
  }
}

function reducer2(state = displayNames, action2){
  if(action2.type==="활동명"){
    let names = [...displayNames]
    names.push(action2.payload2)
    return names
  } else {
    return state
  }
}

let store = createStore(combineReducers({reducer,reducer2}))

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
