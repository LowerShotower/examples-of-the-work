import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { orderBy } from 'lodash-es';
import configureStore from './store/configureStore.js';
import AppRouter from './routers/appRouter.js';
import './styles/styles.scss';


const store = configureStore();


const jsx = (
    < Provider store={store} >
        <AppRouter />
    </Provider >
)

const handler = () => {
    // console.log(store.getState().settings);
    // console.log(store.getState().user);
    //  console.log(store.getState().cards)

}

// let myHeaders = new Headers({
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Credentials': 'true',
//     'Access-Control-Allow-Origin': 'cors_url',
// });

// fetch('https://mmg-score.herokuapp.com/', {
//     method: 'POST',
//     headers: myHeaders,
//     body: JSON.stringify({
//         username: "realusername",
//         email: "realmail@mail.ru",
//         score: 999
//         })
// }).then(function (response) {
//     return response.json();
// }).then(function (data) {
//     console.log(orderBy(data.result, o => o.score));
// });


// fetch('http://mmg-score.herokuapp.com/', {
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     method: 'GET'
// }).then(function (response) {
//     return response.json();
// }).then(function (data) {
//     console.log(slice(reverse(sortBy(data.result, o => o.score)), 0, 10));
// });

const unsubscribe = store.subscribe(handler);

ReactDOM.render(jsx, document.getElementById('app'));

