import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { loadCulture, saveCulture, setCultureField } from './CultureRedux';
import { Culture } from '../Flow/FlowRedux';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import { FormControl, FormControlProps, FormGroup } from 'react-bootstrap';
import FormText from 'react-bootstrap/FormText';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import LoadableButton from '../LoadableButton';

interface CulturePageProps {
    culture: Culture
    id?: string
    isLoading: boolean
    isSaving: boolean

    loadCulture(id: string): void
    saveCulture(culture: Culture): void
    setCultureField(field: string, value: string): void
}

class CulturePage extends React.Component<CulturePageProps> {
    componentDidMount(): void {
        if (this.props.id) {
            this.props.loadCulture(this.props.id)
        }
    }

    onChangeBrand = (e: React.FormEvent<FormControlProps & FormControl>) => {
        this.props.setCultureField('brand', e.currentTarget.value as string);
    };

    onChangeDeveloperName = (e: React.FormEvent<FormControlProps & FormControl>) => {
        this.props.setCultureField('developerName', e.currentTarget.value as string);
    };

    onChangeDeveloperSummary = (e: React.FormEvent<FormControlProps & FormControl>) => {
        this.props.setCultureField('developerSummary', e.currentTarget.value as string);
    };

    onChangeCountry = (e: React.FormEvent<FormControlProps & FormControl>) => {
        this.props.setCultureField('country', e.currentTarget.value as string);
    };

    onChangeLanguage = (e: React.FormEvent<FormControlProps & FormControl>) => {
        this.props.setCultureField('language', e.currentTarget.value as string);
    };

    onChangeVariant = (e: React.FormEvent<FormControlProps & FormControl>) => {
        this.props.setCultureField('variant', e.currentTarget.value as string);
    };

    onSave = () => {
        this.props.saveCulture(this.props.culture);
    };

    render() {
        const { culture, isLoading } = this.props;

        if (isLoading) {
            return (
                <div style={ { marginTop: '4rem', textAlign: 'center' } }>
                    <Spinner animation="border" />
                </div>
            )
        }

        return (
            <Form>
                <Row>
                    <Col>
                        <FormGroup controlId="developerName">
                            <FormLabel>Developer Name</FormLabel>
                            <FormControl type="text" onChange={ this.onChangeDeveloperName } placeholder="Enter a name" value={ culture.developerName } />
                            <FormText className="text-muted">
                                A unique name for the culture in your tenant
                            </FormText>
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup controlId="brand">
                            <FormLabel>Brand</FormLabel>
                            <FormControl type="text" onChange={ this.onChangeBrand } placeholder="Enter a brand" value={ culture.brand } />
                            <FormText className="text-muted">
                                A brand name for the culture
                            </FormText>
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup controlId="developerSummary">
                            <FormLabel>Developer Summary</FormLabel>
                            <FormControl type="text" onChange={ this.onChangeDeveloperSummary } placeholder="Enter a summary" value={ culture.developerSummary } />
                            <FormText className="text-muted">
                                An optional description of the culture
                            </FormText>
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup controlId="country">
                            <FormLabel>Country</FormLabel>
                            <FormControl type="text" onChange={ this.onChangeCountry } placeholder="Enter a country" value={ culture.country } />
                            <FormText className="text-muted">
                                A 3 letter <a target="_blank" href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3"
                                              rel="noopener">ISO 3166-1 alpha-2 country code</a>
                            </FormText>
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup controlId="language">
                            <FormLabel>Language</FormLabel>
                            <FormControl type="text" onChange={ this.onChangeLanguage } placeholder="Enter a language" value={ culture.language } />
                            <FormText className="text-muted">
                                A 2 letter <a target="_blank"
                                              href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes"
                                              rel="noopener">ISO 639-1 language code</a>
                            </FormText>
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup controlId="variant">
                            <FormLabel>Variant</FormLabel>
                            <FormControl type="text" onChange={ this.onChangeVariant } placeholder="Enter a variant" value={ culture.variant } />
                            <FormText className="text-muted">
                                A language variant, usually a 2 letter <a target="_blank"
                                                                          href="https://en.wikipedia.org/wiki/ISO_3166-2"
                                                                          rel="noopener">ISO 3166-2 code</a>
                            </FormText>
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <LoadableButton isLoading={ this.props.isSaving } onClick={ this.onSave }>
                            Save
                        </LoadableButton>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    culture: state.culture.culture,
    isLoading: state.culture.isLoading,
    isSaving: state.culture.isSaving
});

const mapDispatchToProps = ({
    loadCulture,
    saveCulture,
    setCultureField
});

export default connect(mapStateToProps, mapDispatchToProps)(CulturePage);
