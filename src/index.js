import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// we import fetchPosts from postsSlice.js
import { fetchUsers } from './features/users/usersSlice';
import { fetchPosts } from './features/post/postsSlice';

// we want the users to immediately available to us when the app loads, 
// this we dispatch it in the index.js file
store.dispatch(fetchUsers());
store.dispatch(fetchPosts());


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
