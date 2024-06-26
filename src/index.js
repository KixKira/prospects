import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import preRegistroReducer from './features/preRegistro/preRegistroSlice';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore({
  reducer: {
    preRegistro: preRegistroReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
