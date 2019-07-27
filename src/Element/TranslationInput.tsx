import * as React from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import FormControl, { FormControlProps } from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';

interface TranslationInputProps {
    culture: string
    currentValue: [string, string]
    contentValueId: string
    propertyName: string
    onChange(culture: string, id: string, value: string | undefined): void
}

export default class TranslationInput extends React.Component<TranslationInputProps> {
    onChange = (event: React.FormEvent<FormControlProps & FormControl>) => {
        this.props.onChange(this.props.culture, this.props.contentValueId, event.currentTarget.value);
    };

    render() {
        const { currentValue, propertyName } = this.props;

        return (
            <Form.Group as={ Row } controlId="formHorizontalEmail">
                <Form.Label column sm={ 4 }>
                    { propertyName.replace('ContentValueId', '') }
                </Form.Label>

                <Col sm={ 8 }>
                    <FormControl as="textarea" onChange={ this.onChange } type="text" defaultValue={ currentValue ? currentValue[1] : '' } />
                </Col>
            </Form.Group>
        );
    }
}
