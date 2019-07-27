import React  from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import {
    FlowTranslationImage,
    Element,
    loadFlowAndCultures,
    setCurrentElement
} from './FlowRedux';
import { AppState } from '../store';
import FlowElementRow from './FlowElementRow';
import FlowElementTable from './FlowElementTable';

interface FlowPageProps {
    flow: FlowTranslationImage
    id: string
    isLoading: boolean
    loadFlowAndCultures(id: string): void
    setCurrentElement: typeof setCurrentElement
}

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

        const sortByName = (a: Element, b: Element) => a.developerName.localeCompare(b.developerName);

        const mapElements = flow.mapElements.sort(sortByName).map((element: Element) => {
            return <FlowElementRow element={ element } flow={ flow.id } key={ element.id } kind="map" setCurrentElement={ this.props.setCurrentElement } />;
        });

        const navigationElements = flow.navigationElements.sort(sortByName).map((element: Element) => {
            return <FlowElementRow element={ element } flow={ flow.id } key={ element.id } kind="navigation" setCurrentElement={ this.props.setCurrentElement } />;
        });

        const pageElements = flow.pageElements.sort(sortByName).map((element: Element) => {
            return <FlowElementRow element={ element } flow={ flow.id } key={ element.id } kind="page" setCurrentElement={ this.props.setCurrentElement } />;
        });

        const valueElements = flow.valueElements.sort(sortByName).map((element: Element) => {
            return <FlowElementRow element={ element } flow={ flow.id } key={ element.id } kind="value" setCurrentElement={ this.props.setCurrentElement } />;
        });

        return (
            <div>
                <h2>{ flow.developerName }</h2>
                <p>
                    <i>{ flow.developerSummary }</i>
                </p>

                <FlowElementTable elements={ mapElements } title="Map Elements" />
                <FlowElementTable elements={ navigationElements } title="Navigation Elements" />
                <FlowElementTable elements={ pageElements } title="Page Elements" />
                <FlowElementTable elements={ valueElements } title="Value Elements" />
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
