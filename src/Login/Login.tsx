import React from 'react';
import { connect } from 'react-redux';
import { login } from './LoginRedux';
import Form from 'react-bootstrap/Form';
import { FormControl, FormControlProps, FormGroup } from 'react-bootstrap';
import FormLabel from 'react-bootstrap/FormLabel';
import Button from 'react-bootstrap/Button';
import { AppState } from '../store';
import Spinner from 'react-bootstrap/Spinner';
import LoginTenantPicker from './LoginTenantPicker';

interface LoginProps {
    isLoading: boolean
    tenant: string
    token: string
    login(username: string, password: string): void
}

class Login extends React.Component<LoginProps> {
    state = {
        username: '',
        password: ''
    };

    onClickLogin = () => {
        this.props.login(this.state.username, this.state.password);
    };

    onChangeUsername = (e: React.FormEvent<FormControlProps & FormControl>) => {
        this.setState({
            username: e.currentTarget.value
        })
    };

    onChangePassword = (e: React.FormEvent<FormControlProps & FormControl>) => {
        this.setState({
            password: e.currentTarget.value
        })
    };

    render() {
        const { isLoading, tenant, token } = this.props;

        if (isLoading) {
            return (
                <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                    <Spinner animation="border" />
                </div>
            )
        }

        if (token) {
            return <LoginTenantPicker />
        }

        return (
            <Form>
                <h2>Login</h2>

                <FormGroup controlId="username">
                    <FormLabel>Email</FormLabel>
                    <FormControl onChange={ this.onChangeUsername } type="email" placeholder="Enter email" />
                </FormGroup>

                <FormGroup controlId="pPassword">
                    <FormLabel>Password</FormLabel>
                    <FormControl onChange={ this.onChangePassword } type="password" placeholder="Password" />
                </FormGroup>

                <Button onClick={ this.onClickLogin } variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    isLoading: state.login.isLoading,
    token: state.login.token,
    tenant: state.login.tenant
});

const mapDispatchToProps = ({
    login
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
