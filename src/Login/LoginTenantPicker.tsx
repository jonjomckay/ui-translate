import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { loadTenants, setTenant, Tenant } from './LoginRedux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

interface LoginTenantPickerProps {
    tenants: Tenant[]
    token: string

    loadTenants(token: string): void
    setTenant(id: string): void
}

class LoginTenantPicker extends React.Component<LoginTenantPickerProps> {
    componentDidMount(): void {
        this.props.loadTenants(this.props.token);
    }

    render() {
        const tenants = this.props.tenants.map(tenant => (
            <tr key={ tenant.id }>
                <td className="col-lg-10" style={{ verticalAlign: 'middle' }}>
                    { tenant.developerName }
                </td>
                <td className="col-lg-2">
                    <Button onClick={ () => this.props.setTenant(tenant.id) }>
                        Select
                    </Button>
                </td>
            </tr>
        ));

        return (
            <Table>
                <tbody>
                { tenants }
                </tbody>
            </Table>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    tenants: state.login.tenants,
    token: state.login.token
});

const mapDispatchToProps = ({
    loadTenants,
    setTenant
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginTenantPicker);
