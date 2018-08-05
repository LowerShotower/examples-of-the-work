import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js';
import AppRouter from './routers/appRouter.js';
import './styles/styles.scss';

const store = configureStore();

const jsx = (
    < Provider store={store} >
        <AppRouter />
    </Provider >
)

function handler() {
    // console.log(store.getState().settings);
    // console.log(store.getState().user);
}

const unsubscribe = store.subscribe(handler);

ReactDOM.render(jsx, document.getElementById('app'));
