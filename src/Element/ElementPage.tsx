import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store';
import flat from 'flat';
import {
    Culture,
    Element,
    MapElement,
    ElementTranslation,
    saveElement,
    addElementTranslation
} from '../Flow/FlowRedux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import BreadcrumbItem from 'react-bootstrap/BreadcrumbItem';
import TranslationInput from './TranslationInput';
import LoadableButton from '../LoadableButton';
import { useNavigation } from 'react-navi';

interface ElementPageProps {
    cultures: Culture[]
    flow: string
    isSaving: boolean
    element: Element

    addElementTranslation(translation: ElementTranslation): void
    saveMapElement(mapElement: MapElement): Promise<void>
}

function ElementPage(props: ElementPageProps) {
    const navigation = useNavigation();

    const { cultures, flow, isSaving, element } = props;

    console.log(props);

    const keys = flat(element) as any;

    const filtered = Object.keys(keys)
        .filter(key => key.endsWith('ContentValueId'))
        .sort((a, b) => a.localeCompare(b))
        .reduce((obj: any, key: string) => {
            obj[key] = keys[key];
            return obj;
        }, {});

    const onChange = (culture: string, id: string, value: string) => {
        props.addElementTranslation({
            culture: culture,
            id: id,
            value: value
        });
    };

    const onSave = async () => {
        props.saveMapElement(props.element)
            .then(async () => await navigation.navigate('/flow/' + flow));
    };

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
                        onChange={ onChange }
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
                    <LoadableButton isLoading={ isSaving } onClick={ onSave }>
                        Save
                    </LoadableButton>
                </Col>
            </Row>
        </React.Fragment>
    );
}

const mapStateToProps = (state: AppState) => ({
    cultures: state.flow.cultures,
    isSaving: state.flow.isSaving,
    element: state.flow.currentElement
});

const mapDispatchToProps = ({
    addElementTranslation,
    saveMapElement: saveElement
});

export default connect(mapStateToProps, mapDispatchToProps)(ElementPage);
