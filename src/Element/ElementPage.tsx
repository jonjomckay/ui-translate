import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store';
import flat from 'flat';
import {
    Culture,
    Element,
    ElementTranslation
} from '../Flow/FlowRedux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import BreadcrumbItem from 'react-bootstrap/BreadcrumbItem';
import TranslationInput from './TranslationInput';
import LoadableButton from '../LoadableButton';
import { addElementTranslation, loadElement, saveElement } from './ElementRedux';
import { loadCultures } from '../Cultures/CulturesRedux';
import Spinner from 'react-bootstrap/Spinner';

interface ElementPageProps {
    cultures: Culture[]
    flow: string
    id: string
    kind: string
    isLoading: boolean
    isSaving: boolean
    element: Element

    addElementTranslation(translation: ElementTranslation): void
    loadCultures(): void
    loadElement(flow: string, id: string, kind: string): void
    saveElement(flow: string, element: Element, kind: string): Promise<void>
}

class ElementPage extends React.Component<ElementPageProps> {
    componentDidMount(): void {
        this.props.loadCultures();
        this.props.loadElement(this.props.flow, this.props.id, this.props.kind);
    }

    onChange = (culture: string, id: string, value: string) => {
        this.props.addElementTranslation({
            culture: culture,
            id: id,
            value: value
        });
    };

    onSave = async () => {
        await this.props.saveElement(this.props.flow, this.props.element, this.props.kind);
    };

    render() {
        const { cultures, isLoading, isSaving, element } = this.props;

        if (isLoading) {
            return (
                <div style={ { marginTop: '4rem', textAlign: 'center' } }>
                    <Spinner animation="border" />
                </div>
            )
        }

        const keys = flat(element) as any;

        const filtered = Object.keys(keys)
            .filter(key => key.endsWith('ContentValueId'))
            .sort((a, b) => a.localeCompare(b))
            .reduce((obj: any, key: string) => {
                obj[key] = keys[key];
                return obj;
            }, {});

        // We want to be able to translate any content value for every culture in the tenant
        const availableCultures = cultures.map(culture => {
            const translations = Object.entries(filtered).map(([propertyName, contentValueId]) => {
                let currentValue = ['', ''] as [string, string];

                // If there is a currently defined translation for this culture, find it
                let cultureTranslations = element.contentValueDocument.translations[culture.id];
                if (cultureTranslations && cultureTranslations.contentValues) {
                    let value = Object.entries(cultureTranslations.contentValues)
                        .find(([id]) => contentValueId === id);

                    if (value) {
                        currentValue = value;
                    }
                }

                return (
                    <Col lg={ 12 } key={ propertyName }>
                        <TranslationInput
                            contentValueId={ contentValueId as string }
                            culture={ culture.id }
                            currentValue={ currentValue }
                            onChange={ this.onChange }
                            propertyName={ propertyName }
                        />
                    </Col>
                );
            });

            return (
                <React.Fragment key={ culture.id }>
                    <h4 title={ culture.id }>
                        { culture.developerName } ({ culture.language }, { culture.country })
                    </h4>

                    <Row key={ culture.id }>
                        { translations }
                    </Row>
                </React.Fragment>
            );
        });

        return (
            <React.Fragment>
                <Breadcrumb>
                    <BreadcrumbItem>
                        Flow
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        Map Elements
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        { element.developerName }
                    </BreadcrumbItem>
                </Breadcrumb>

                { availableCultures }

                <hr />

                <Row>
                    <Col lg={ { span: 8, offset: 4 } }>
                        <LoadableButton isLoading={ isSaving } onClick={ this.onSave }>
                            Save
                        </LoadableButton>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    cultures: state.cultures.cultures,
    isLoading: state.cultures.isLoading || state.element.isLoading,
    isSaving: state.element.isSaving,
    element: state.element.element
});

const mapDispatchToProps = ({
    addElementTranslation,
    loadCultures,
    loadElement,
    saveElement
});

export default connect(mapStateToProps, mapDispatchToProps)(ElementPage);
