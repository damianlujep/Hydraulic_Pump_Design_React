import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import "./scss/main.scss";
import {AuthProvider} from "./components/contexts/AuthContext";
import {Provider} from "react-redux";
import store from "./components/store/hpd-store-redux";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </Provider>,
    </React.StrictMode>,
    document.getElementById('root')
);