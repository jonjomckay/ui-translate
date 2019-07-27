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
import ElementPage from './Element/ElementPage';

const store = createStore(rootReducer, applyMiddleware(
    createLogger(),
    thunk
));

const elementRoute = route(async req => {
    return {
        title: 'Translate Flow',
        view: <ElementPage flow={ req.params.flow } />
    }
});

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
    '/flow/:flow/map/:id': elementRoute,
    '/flow/:flow/navigation/:id': elementRoute,
    '/flow/:flow/page/:id': elementRoute,
    '/flow/:flow/value/:id': elementRoute,
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
