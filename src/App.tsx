import React, { Suspense } from 'react';
import { Router, View } from 'react-navi';
import axios from 'axios';
import { mount, route } from 'navi';
import Container from 'react-bootstrap/Container';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { rootReducer } from './store';
import FlowPage from './Flow/FlowPage';
import FlowsPage from './Flows/FlowsPage';
import MapElementPage from './MapElement/MapElementPage';

const store = createStore(rootReducer, applyMiddleware(
    createLogger(),
    thunk
));

const routes = mount({
    '/': route({
        title: 'Flows',
        view: <FlowsPage />
    }),
    '/flow/:flow': route(async req => {
        return {
            title: 'Translate Flow',
            view: <FlowPage id={ req.params.flow } />
        }
    }),
    '/flow/:flow/map/:mapElement': route(async req => {
        return {
            title: 'Translate Flow',
            view: <MapElementPage flow={ req.params.flow } />
        }
    }),
});

axios.defaults.headers = {
    'Authorization': process.env['FLOW_TOKEN'],
    'ManyWhoTenant': process.env['FLOW_TENANT']
};

const App: React.FC = () => {
    return (
        <Provider store={ store }>
            <Router routes={ routes }>
                <Suspense fallback={ null }>
                    <Container>
                        <View />
                    </Container>
                </Suspense>
            </Router>
        </Provider>
    );
};

export default App;
