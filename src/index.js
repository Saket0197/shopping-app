import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { store } from './redux/store';
import { Provider } from 'react-redux';
import ProductContextProvider from './context/ProductContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <ProductContextProvider>
                <App />
            </ProductContextProvider>
        </Provider>
    </BrowserRouter>
);

