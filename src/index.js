import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import store from "./store";
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
export const DEFAULT_URL = "http://" + window.location.host;

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);