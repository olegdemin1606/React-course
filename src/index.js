import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initialList } from './components/store/InitData';
import MyProvider from './components/store/Context';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
    <MyProvider initialValue={initialList}>
        <App/>
    </MyProvider>
);