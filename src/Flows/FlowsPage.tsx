import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { Flow, loadFlows } from './FlowsRedux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-navi';
import Spinner from 'react-bootstrap/Spinner';

interface FlowsProps {
    flows: Flow[]
    isLoading: boolean
    loadFlows(): void
}

class FlowsPage extends React.Component<FlowsProps> {
    componentDidMount(): void {
        this.props.loadFlows();
    }

    render() {
        const { flows, isLoading } = this.props;

        if (isLoading) {
            return (
                <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                    <Spinner animation="border" />
                </div>
            )
        }

        return (
            <Table className="flows">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {
                    flows.map(flow =>
                        (
                            <tr key={ flow.id.id }>
                                <td>{ flow.developerName }</td>
                                <td>
                                    <Button as={ Link } href={ `/flow/${ flow.id.id }` }>
                                        Translate
                                    </Button>
                                </td>
                            </tr>
                        ))
                }
                </tbody>
            </Table>
        );
    }
}

const mapDispatchToProps = ({
    loadFlows
});

const mapStateToProps = (state: AppState) => {
    return {
        flows: state.flows.flows,
        isLoading: state.flows.isLoading
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FlowsPage);
