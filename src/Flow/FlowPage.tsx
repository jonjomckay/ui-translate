import React from 'react';
import { connect } from 'react-redux';
import {
    FlowTranslationImage,
    loadFlowAndCultures,
    Element,
    MapElement, PageElement,
    setCurrentElement
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
    setCurrentElement(element: Element, kind: string): void
}

// Extract
interface FlowElementButtonProps {
    flow: string
    element: Element
    kind: string
    setCurrentElement(element: Element, kind: string): void
}

// Extract
const FlowElementButton: React.FunctionComponent<FlowElementButtonProps> = ({ flow, element, setCurrentElement, kind }) => {
    const onClick = () => {
        setCurrentElement(element, kind);
    };

    return (
        <Button as={ Link } href={ `/flow/${ flow }/${ kind }/${ element.id }` } onClick={ onClick }>
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

        const mapElements = flow.mapElements.sort((a, b) => a.developerName.localeCompare(b.developerName)).map((element: MapElement) => {
            return (
                <tr key={ element.id }>
                    <td>{ element.developerName }</td>
                    <td>
                        <FlowElementButton flow={ flow.id } kind="map" element={ element } setCurrentElement={ this.props.setCurrentElement } />
                    </td>
                </tr>
            );
        });

        const pageElements = flow.pageElements.sort((a, b) => a.developerName.localeCompare(b.developerName)).map((element: PageElement) => {
            return (
                <tr key={ element.id }>
                    <td>{ element.developerName }</td>
                    <td>
                        <FlowElementButton flow={ flow.id } kind="page" element={ element } setCurrentElement={ this.props.setCurrentElement } />
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <h2>{ flow.developerName }</h2>

                <h5>Map Elements</h5>

                <Table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Translations</th>
                    </tr>
                    </thead>

                    <tbody>
                    { mapElements }
                    </tbody>
                </Table>

                <h5>Page Elements</h5>

                <Table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Translations</th>
                    </tr>
                    </thead>

                    <tbody>
                    { pageElements }
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
    setCurrentElement
});

export default connect(mapStateToProps, mapDispatchToProps)(FlowPage);
