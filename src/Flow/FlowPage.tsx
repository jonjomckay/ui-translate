import React from 'react';
import { connect } from 'react-redux';
import {
    FlowTranslationImage,
    loadFlowAndCultures,
    MapElement,
    setCurrentMapElement
} from './FlowRedux';
import { AppState } from '../store';
import { Link } from 'react-navi';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

interface FlowPageProps {
    flow: FlowTranslationImage
    id: string
    isLoading: boolean
    loadFlowAndCultures(id: string): void
    setCurrentMapElement(mapElement: MapElement): void
}

// Extract
interface FlowMapElementButtonProps {
    flow: string
    mapElement: MapElement
    setCurrentMapElement(mapElement: MapElement): void
}

// Extract
const FlowMapElementButton: React.FunctionComponent<FlowMapElementButtonProps> = ({ flow, mapElement, setCurrentMapElement }) => {
    const onClick = () => {
        setCurrentMapElement(mapElement);
    };

    return (
        <Button as={ Link } href={ `/flow/${ flow }/map/${ mapElement.id }` } onClick={ onClick }>
            Translate
        </Button>
    )
};

class FlowPage extends React.Component<FlowPageProps> {
    componentDidMount(): void {
        this.props.loadFlowAndCultures(this.props.id)
    }

    render() {
        const { flow, isLoading } = this.props;

        if (isLoading) {
            return (
                <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                    <Spinner animation="border" />
                </div>
            )
        }

        const elements = flow.mapElements.sort((a, b) => a.developerName.localeCompare(b.developerName)).map((mapElement: MapElement) => {
            return (
                <tr key={ mapElement.id }>
                    <td>{ mapElement.developerName }</td>
                    <td>
                        <FlowMapElementButton flow={ flow.id } mapElement={ mapElement } setCurrentMapElement={ this.props.setCurrentMapElement } />
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <h2>{ flow.developerName }</h2>

                <h4>Map Elements</h4>

                <Table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Translations</th>
                    </tr>
                    </thead>

                    <tbody>
                    { elements }
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        flow: state.flow.flow,
        isLoading: state.flow.isLoading
    }
};

const mapDispatchToProps = ({
    loadFlowAndCultures,
    setCurrentMapElement
});

export default connect(mapStateToProps, mapDispatchToProps)(FlowPage);
