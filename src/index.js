import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import "./scss/main.scss";
import {AuthProvider} from "./components/contexts/AuthContext";

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);