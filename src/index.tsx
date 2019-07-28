import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './store';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const store = createStore(rootReducer, applyMiddleware(
    createLogger(),
    thunk
));

const app = (
    <Provider store={ store }>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
