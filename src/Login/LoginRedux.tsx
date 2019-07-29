import ReactGA from 'react-ga';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../store';
import { Action } from 'redux';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_TENANT = 'SET_TENANT';
export const SET_TENANTS = 'SET_TENANTS';
export const TOGGLE_LOGIN_LOADING = 'TOGGLE_LOGIN_LOADING';

interface SetTenantAction {
    type: typeof SET_TENANT
    tenant: string
}

interface SetTenantsAction {
    type: typeof SET_TENANTS
    tenants: Tenant[]
}

interface SetTokenAction {
    type: typeof SET_TOKEN
    token: string
}

interface ToggleLoginLoadingAction {
    type: typeof TOGGLE_LOGIN_LOADING
}

export type LoginRedux = SetTenantAction | SetTenantsAction | SetTokenAction | ToggleLoginLoadingAction;

export const setTenant = (id: string): ThunkAction<void, AppState, null, Action<string>> => async (dispatch, getState) => {
    const state = getState();

    axios.defaults.headers = {
        'Authorization': state.login.token,
        'ManyWhoTenant': id
    };

    const claims = jwtDecode<any>(state.login.token);

    ReactGA.initialize('UA-144851353-1', {
        debug: true,
        gaOptions: {
            userId: claims.sub
        }
    });

    dispatch({
        type: SET_TENANT,
        tenant: id
    });
};

function setToken(token: string) {
    return {
        type: SET_TOKEN,
        token: token
    }
}

function toggleLoginLoading() {
    return {
        type: TOGGLE_LOGIN_LOADING
    }
}

export const loadTenants = (token: string): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    // TODO: Loading

    axios.get('https://uat.manywho.com/api/admin/1/users/me', {
        headers: {
            'Authorization': token
        }
    })
        .then(response => {
            dispatch({
                type: SET_TENANTS,
                tenants: response.data.tenants
            });
        });
};

export const login = (username: string, password: string): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch(toggleLoginLoading());

    const request = {
        username: username,
        password: password
    };

    axios.post('https://uat.manywho.com/api/draw/1/authentication', request)
        .then(response => {
            dispatch(toggleLoginLoading());
            dispatch(setToken(response.data))
        });
};

export interface Tenant {
    developerName: string
    developerSummary: string
    id: string
    lastLoggedInAt: string
}

export interface LoginState {
    isLoading: boolean
    isLoggedIn: boolean
    tenant: string
    tenants: Tenant[]
    token: string
}
