import React from 'react';
import { connect } from 'react-redux';
import { loadCultures } from './CulturesRedux';
import { AppState } from '../store';
import { Culture } from '../Flow/FlowRedux';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import CulturesRow from './CulturesRow';

interface CulturesPageProps {
    cultures: Culture[]
    isLoading: boolean

    loadCultures(): void;
}

class CulturesPage extends React.Component<CulturesPageProps> {
    componentDidMount(): void {
        this.props.loadCultures();
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div style={ { marginTop: '4rem', textAlign: 'center' } }>
                    <Spinner animation="border" />
                </div>
            )
        }

        const cultures = this.props.cultures.map((culture: Culture) => (
            <CulturesRow culture={ culture } />
        ));

        return (
            <div>
                <h2 className="mb-3">Cultures</h2>

                <Table>
                    <tbody>
                    { cultures }
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    cultures: state.cultures.cultures,
    isLoading: state.cultures.isLoading
});

const mapDispatchToProps = ({
    loadCultures
});

export default connect(mapStateToProps, mapDispatchToProps)(CulturesPage);
