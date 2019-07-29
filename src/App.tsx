import React, { Suspense } from 'react';
import ReactGA from 'react-ga';
import { Router, View } from 'react-navi';
import axios from 'axios';
import { map, Matcher, mount, redirect, route } from 'navi';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import { AppState } from './store';
import FlowPage from './Flow/FlowPage';
import FlowsPage from './Flows/FlowsPage';
import ElementPage from './Element/ElementPage';
import Header from './Header/Header';
import CulturesPage from './Cultures/CulturesPage';
import CulturePage from './Culture/CulturePage';
import { IconContext } from 'react-icons';
import Login from './Login/Login';

function withTracking(matcher: Matcher<any>) {
    return map((request, context: any) => {
        ReactGA.pageview(request.originalUrl);

        return matcher;
    })
}

function withAuthentication(matcher: Matcher<any>) {
    return map((request, context: any) =>
        context.isLoggedIn
            ? matcher
            : redirect(
            '/login?redirectTo=' + encodeURIComponent(request.mountpath + request.search))
    )
}

const routes = mount({
    '/': withAuthentication(withTracking(route({
        title: 'Flows',
        view: <FlowsPage />
    }))),
    '/login': withTracking(map(async (request, context: any) => {
        if (context.isLoggedIn) {
            return redirect(
                request.params.redirectTo
                    ? decodeURIComponent(request.params.redirectTo)
                    : '/'
            )
        } else {
            return route({
                title: 'Login',
                view: <Login />
            })
        }
    })),
    '/cultures': withAuthentication(withTracking(route({
        title: 'Cultures',
        view: <CulturesPage />
    }))),
    '/cultures/new': withAuthentication(withTracking(route({
        title: 'Cultures',
        view: <CulturePage />
    }))),
    '/cultures/:id': withAuthentication(withTracking(route(async req => {
        return {
            title: 'Culture',
            view: <CulturePage id={ req.params.id } />
        }
    }))),
    '/flow/:flow': withAuthentication(withTracking(route(async req => {
        return {
            title: 'Translate Flow',
            view: <FlowPage id={ req.params.flow } />
        }
    }))),
    '/flow/:flow/:kind/:id': withAuthentication(withTracking(route(async req => {
        return {
            title: 'Translate Flow',
            view: <ElementPage flow={ req.params.flow } id={ req.params.id } kind={ req.params.kind } />
        }
    })))
});

interface AppProps {
    isLoggedIn: boolean
}

const App: React.FC<AppProps> = ({ isLoggedIn }) => {
    ReactGA.initialize('UA-144851353-1');

    return (
        <IconContext.Provider value={ { style: { verticalAlign: 'middle' } } }>
            <Router routes={ routes } context={ { isLoggedIn } }>
                <Header />

                <Suspense fallback={ null }>
                    <Container style={ { marginTop: '1rem' } }>
                        <View />
                    </Container>
                </Suspense>
            </Router>
        </IconContext.Provider>
    );
};

const mapStateToProps = (state: AppState) => ({
    isLoggedIn: state.login.isLoggedIn
});

export default connect(mapStateToProps)(App);
