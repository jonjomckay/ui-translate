import { LoginRedux, LoginState } from './LoginRedux';

const initialState: LoginState = {
    isLoading: false,
    isLoggedIn: false,
    tenant: '',
    tenants: [],
    token: ''
};

export function loginReducer(state = initialState, action: LoginRedux): LoginState {
    switch (action.type) {
        case 'SET_TENANT':
            return {
                ...state,
                isLoggedIn: true,
                tenant: action.tenant
            };
        case 'SET_TENANTS':
            return {
                ...state,
                tenants: action.tenants
            };
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            };
        case 'TOGGLE_LOGIN_LOADING':
            return {
                ...state,
                isLoading: !state.isLoading
            };
        default:
            return state;
    }
}
